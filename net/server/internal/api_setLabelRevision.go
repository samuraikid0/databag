package databag

import (
  "net/http"
  "gorm.io/gorm"
  "databag/internal/store"
)

func SetLabelRevision(w http.ResponseWriter, r *http.Request) {

  card, code, err := BearerContactToken(r)
  if err != nil {
    ErrResponse(w, code, err)
    return
  }

  var revision int64
  if err := ParseRequest(r, w, &revision); err != nil {
    ErrResponse(w, http.StatusBadRequest, err)
    return
  }

  if err := NotifyProfileRevision(card, revision); err != nil {
    ErrResponse(w, http.StatusInternalServerError, err)
    return
  }

  WriteResponse(w, nil)
}

func NotifyLabelRevision(card *store.Card, revision int64) error {

  act := &card.Account
  err := store.DB.Transaction(func(tx *gorm.DB) error {
    if res := tx.Model(card).Where("id = ?", card.ID).Update("notified_label", revision).Error; res != nil {
      return res
    }
    if res := tx.Model(act).Where("id = ?", act.ID).Update("card_revision", act.CardRevision + 1).Error; res != nil {
      return res
    }
    return nil
  })
  if err != nil {
    return err
  }
  SetStatus(act)
  return nil
}

