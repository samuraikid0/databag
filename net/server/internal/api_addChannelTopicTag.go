package databag

import (
  "time"
  "errors"
  "net/http"
  "github.com/gorilla/mux"
  "gorm.io/gorm"
  "github.com/google/uuid"
  "databag/internal/store"
)

func AddChannelTopicTag(w http.ResponseWriter, r *http.Request) {

  // scan parameters
  params := mux.Vars(r)
  topicId := params["topicId"]

  var subject Subject
  if err := ParseRequest(r, w, &subject); err != nil {
    ErrResponse(w, http.StatusBadRequest, err)
    return
  }

  channelSlot, guid, err, code := getChannelSlot(r, false)
  if err != nil {
    ErrResponse(w, code, err)
    return
  }
  act := &channelSlot.Account

  // load topic
  var topicSlot store.TopicSlot
  if err = store.DB.Preload("Topic.Tags").Where("channel_id = ? AND topic_slot_id = ?", channelSlot.Channel.ID, topicId).First(&topicSlot).Error; err != nil {
    if errors.Is(err, gorm.ErrRecordNotFound) {
      ErrResponse(w, http.StatusNotFound, err)
    } else {
      ErrResponse(w, http.StatusInternalServerError, err)
    }
    return
  }
  if topicSlot.Topic == nil {
    ErrResponse(w, http.StatusNotFound, errors.New("referenced empty topic"))
    return
  }

  // save tag
  tagSlot := &store.TagSlot{}
  err = store.DB.Transaction(func(tx *gorm.DB) error {

    tagSlot.TagSlotId = uuid.New().String()
    tagSlot.AccountID = act.ID
    tagSlot.Revision = act.ChannelRevision + 1
    tagSlot.ChannelID = channelSlot.Channel.ID
    tagSlot.TopicID = topicSlot.Topic.ID
    if res := tx.Save(tagSlot).Error; res != nil {
      return res
    }

    tag := &store.Tag{}
    tag.ChannelID = channelSlot.Channel.ID
    tag.TopicID = topicSlot.Topic.ID
    tag.TagSlotID = tagSlot.ID
    tag.Guid = guid
    tag.DataType = subject.DataType
    tag.Data = subject.Data
    if res := tx.Save(tag).Error; res != nil {
      return res
    }

    if res := tx.Model(&topicSlot.Topic).Update("tag_count", len(topicSlot.Topic.Tags) + 1).Error; res != nil {
      return res
    }
    if res := tx.Model(&topicSlot.Topic).Update("tag_updated", time.Now().Unix()).Error; res != nil {
      return res
    }
    if res := tx.Model(&topicSlot.Topic).Update("tag_revision", act.ChannelRevision + 1).Error; res != nil {
      return res
    }
    if res := tx.Model(&topicSlot).Update("revision", act.ChannelRevision + 1).Error; res != nil {
      return res
    }
    if res := tx.Model(&channelSlot).Update("revision", act.ChannelRevision + 1).Error; res != nil {
      return res
    }
    if res := tx.Model(act).Update("channel_revision", act.ChannelRevision + 1).Error; res != nil {
      return res
    }
    return nil
  })
  if err != nil {
    ErrResponse(w, http.StatusInternalServerError, err)
    return
  }

  // determine affected contact list
  cards := make(map[string]store.Card)
  for _, card := range channelSlot.Channel.Cards {
    cards[card.Guid] = card
  }
  for _, group := range channelSlot.Channel.Groups {
    for _, card := range group.Cards {
      cards[card.Guid] = card
    }
  }

  // notify
  SetStatus(act)
  for _, card := range cards {
    SetContactChannelNotification(act, &card)
  }

  WriteResponse(w, getTagModel(tagSlot))
}

