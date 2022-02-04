package databag

import (
  "errors"
  "strconv"
  "net/http"
  "encoding/hex"
  "gorm.io/gorm"
  "github.com/gorilla/mux"
  "databag/internal/store"
  "github.com/theckman/go-securerandom"
)

func SetCardStatus(w http.ResponseWriter, r *http.Request) {
  var res error

  account, code, err := BearerAppToken(r, false);
  if err != nil {
    ErrResponse(w, code, err)
    return
  }

  // scan parameters
  params := mux.Vars(r)
  cardId := params["cardId"]
  token := r.FormValue("token")

  // scan revisions
  var viewRevision int64
  view := r.FormValue("viewRevision")
  if view != "" {
    if viewRevision, res = strconv.ParseInt(view, 10, 64); res != nil {
      ErrResponse(w, http.StatusBadRequest, res)
      return
    }
  }
  var contentRevision int64
  content := r.FormValue("contentRevision")
  if content != "" {
    if contentRevision, res = strconv.ParseInt(content, 10, 64); res != nil {
      ErrResponse(w, http.StatusBadRequest, res)
      return
    }
  }
  var labelRevision int64
  label := r.FormValue("labelRevision")
  if label != "" {
    if labelRevision, res = strconv.ParseInt(label, 10, 64); res != nil {
      ErrResponse(w, http.StatusBadRequest, res)
      return
    }
  }
  var profileRevision int64
  profile := r.FormValue("profileRevision")
  if profile != "" {
    if profileRevision, res = strconv.ParseInt(profile, 10, 64); res != nil {
      ErrResponse(w, http.StatusBadRequest, res)
      return
    }
  }

  var status string
  if err := ParseRequest(r, w, &status); err != nil {
    ErrResponse(w, http.StatusBadRequest, err)
    return
  }
  if !AppCardStatus(status) {
    ErrResponse(w, http.StatusBadRequest, errors.New("unknown status"))
    return
  }
  if status == APP_CARDCONNECTED && token == "" {
    ErrResponse(w, http.StatusBadRequest, errors.New("connected token not set"))
    return
  }

  // load referenced card
  var slot store.CardSlot
  if err := store.DB.Preload("Card.Groups").Where("account_id = ? AND card_slot_id = ?", account.ID, cardId).First(&slot).Error; err != nil {
    if !errors.Is(err, gorm.ErrRecordNotFound) {
      ErrResponse(w, http.StatusInternalServerError, err)
    } else {
      ErrResponse(w, http.StatusNotFound, err)
    }
    return
  }
  if slot.Card == nil {
    ErrResponse(w, http.StatusNotFound, errors.New("card has been deleted"))
    return
  }

  // update card
  slot.Revision = account.CardRevision + 1
  if token != "" {
    slot.Card.OutToken = token
  }
  if status == APP_CARDCONNECTING {
    if slot.Card.Status != APP_CARDCONNECTING && slot.Card.Status != APP_CARDCONNECTED {
      data, err := securerandom.Bytes(APP_TOKENSIZE)
      if err != nil {
        ErrResponse(w, http.StatusInternalServerError, err)
        return
      }
      slot.Card.InToken = hex.EncodeToString(data)
    }
  }
  slot.Card.Status = status
  slot.Card.NotifiedView = viewRevision
  slot.Card.NotifiedContent = contentRevision
  slot.Card.NotifiedLabel = labelRevision
  slot.Card.NotifiedProfile = profileRevision

  // save and update contact revision
  err = store.DB.Transaction(func(tx *gorm.DB) error {
    if res := tx.Save(&slot.Card).Error; res != nil {
      return res
    }
    if res := tx.Preload("Card").Save(&slot).Error; res != nil {
      return res
    }
    if res := tx.Model(&account).Update("card_revision", account.CardRevision + 1).Error; res != nil {
      return res
    }
    return nil
  })
  if err != nil {
    ErrResponse(w, http.StatusInternalServerError, err)
    return
  }

  SetStatus(account)
  WriteResponse(w, getCardModel(&slot));
}

