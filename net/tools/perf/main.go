package main

import (
	"flag"
	"log"
	"net/url"
	"os"
  "fmt"
  "bytes"
	"os/signal"
	"time"
  "strconv"
  "net/http"
  "encoding/json"
  "encoding/base64"
	"github.com/gorilla/websocket"
  "github.com/kr/pretty"
)

type Profile struct {
  GUID string `json:"guid"`
  Handle string `json:"handle,omitempty"`
  Name string `json:"name,omitempty"`
  Description string `json:"description,omitempty"`
  Location string `json:"location,omitempty"`
  Image string `json:"image,omitempty"`
  Seal string `json:"seal,omitempty"`
  Revision int64 `json:"revision"`
  Version string `json:"version,omitempty"`
  Node string `json:"node"`
}
type LoginAccess struct {
  GUID string `json:"guid"`
  AppToken string `json:"appToken"`
  Created int64 `json:"created"`
  PushSupported bool `json:"pushSupported"`
}
type Card struct {
  ID string `json:"id"`
  Revision int64 `json:"revision"`
  Data *CardData `json:"data"`
}
type CardData struct {
  DetailRevision int64 `json:"detailRevision"`
  ProfileRevision int64 `json:"profileRevision"`
  NotifiedProfile int64 `json:"notifiedProfile"`
  NotifiedArticle int64 `json:"notifiedArticle"`
  NotifiedChannel int64 `json:"notifiedChannel"`
  NotifiedView int64 `json:"notifiedView"`
  CardDetail *CardDetail `json:"cardDetail,omitempty"`
  CardProfile *CardProfile `json:"cardProfile,omitempty"`
}
type CardDetail struct {
  Status string `json:"status"`
  StatusUpdated int64 `json:"statusUpdated"`
  Token string `json:"token,omitempty"`
  Notes string `json:"notes,omitempty"`
  Groups []string `json:"groups,omitempty"`
}
type CardProfile struct {
  GUID string `json:"guid"`
  Handle string `json:"handle,omitempty"`
  Name string `json:"name,omitempty"`
  Description string `json:"description,omitempty"`
  Location string `json:"location,omitempty"`
  ImageSet bool `json:"imageSet"`
  Seal string `json:"seal,omitempty"`
  Version string `json:"version,omitempty"`
  Node string `json:"node"`
}

var addr = flag.String("addr", "localhost:7000", "databag status connection")

func main() {

  args := os.Args
  if len(args) > 1 {
    fmt.Println("using admin token: " + args[1]);
  } else {
    fmt.Println("enter admin token")
    return
  }

  now := time.Now();
  baseHandle := "_" + strconv.Itoa(int(now.Unix())) + "_";

  // create accounts A, B, C, D
  client := &http.Client{}
  acts := []string{ "A", "B", "C", "D" }
  for _, act := range acts {
    var dec *json.Decoder
    var req *http.Request
    var resp *http.Response
    var err error

    req, err = http.NewRequest("POST", "http://localhost:7000/admin/accounts?token=" + args[1], nil);
    resp, err = client.Do(req)
    if err != nil {
      fmt.Println(err)
      return
    }

    var token string
    dec = json.NewDecoder(resp.Body)
    dec.Decode(&token)

    req, err = http.NewRequest("POST", "http://localhost:7000/account/profile?token=" + token, nil);
    auth := base64.StdEncoding.EncodeToString([]byte(baseHandle + act + ":pass"))
    req.Header.Add("Credentials", "Basic "+auth)
    resp, err = client.Do(req)
    if err != nil {
      fmt.Println(err)
      return
    }
  }

  // login to each account
  logins := []*LoginAccess{}
  for _, act := range acts {
    var dec *json.Decoder
    var req *http.Request
    var resp *http.Response
    var err error

    req, err = http.NewRequest("POST", "http://localhost:7000/account/apps?appName=perf&appVersion=0", bytes.NewBuffer([]byte("[]")));
    auth := base64.StdEncoding.EncodeToString([]byte(baseHandle + act + ":pass"))
    req.Header.Add("Authorization", "Basic "+auth)
    resp, err = client.Do(req)
    if err != nil {
      fmt.Println(err)
      return
    }

    login := &LoginAccess{}
    dec = json.NewDecoder(resp.Body)
    dec.Decode(login)
    logins = append(logins, login)
  }

  // set each profile to searchable
  for _, login := range logins {
    var req *http.Request
    var err error

    req, err = http.NewRequest("PUT", "http://localhost:7000/account/searchable?agent=" + login.AppToken, bytes.NewBuffer([]byte("true")));
    _, err = client.Do(req)
    if err != nil {
      fmt.Println(err)
      return
    }
  }

  // add the card of each other
  for i, login := range logins {
    for j, contact := range logins {
      if i != j {
        var req *http.Request
        var resp *http.Response
        var err error

        req, err = http.NewRequest("GET", "http://localhost:7000/account/listing/" + contact.GUID + "/message", nil);
        resp, err = client.Do(req)
        if err != nil {
          fmt.Println(err)
          return
        }

        req, err = http.NewRequest("POST", "http://localhost:7000/contact/cards?agent=" + login.AppToken, resp.Body);
        _, err = client.Do(req)
        if err != nil {
          fmt.Println(err)
          return
        }
      }
    }
  }

  // request each other as contact
  for _, login := range logins {
    var dec *json.Decoder
    var req *http.Request
    var resp *http.Response
    var err error

    req, err = http.NewRequest("GET", "http://localhost:7000/contact/cards?agent=" + login.AppToken, nil);
    resp, err = client.Do(req)
    if err != nil {
      fmt.Println(err)
      return
    }

    cards := &[]Card{}
    dec = json.NewDecoder(resp.Body)
    dec.Decode(cards)

    for _, card := range *cards {
      req, err = http.NewRequest("PUT", "http://localhost:7000/contact/cards/" + card.ID + "/status?agent=" + login.AppToken, bytes.NewBuffer([]byte("\"connecting\"")));
      resp, err = client.Do(req)
      if err != nil || resp.StatusCode / 100 != 2 {
        fmt.Println("set card status failed")
        return
      }
      req, err = http.NewRequest("GET", "http://localhost:7000/contact/cards/" + card.ID + "/openMessage?agent=" + login.AppToken, nil);
      resp, err = client.Do(req)
      if err != nil || resp.StatusCode / 100 != 2 {
        fmt.Println("get open message failed")
        return
      }
      req, err = http.NewRequest("PUT", "http://localhost:7000/contact/cards/openMessage", resp.Body);
      _, err = client.Do(req)
      if err != nil || resp.StatusCode / 100 != 2 {
        fmt.Println("set open message failed")
        return
      }
    }
  }


  // request each other as contact
  for _, login := range logins {
    var dec *json.Decoder
    var req *http.Request
    var resp *http.Response
    var err error

    req, err = http.NewRequest("GET", "http://localhost:7000/contact/cards?agent=" + login.AppToken, nil);
    resp, err = client.Do(req)
    if err != nil {
      fmt.Println(err)
      return
    }

    fmt.Println("******");
    cards := &[]Card{}
    dec = json.NewDecoder(resp.Body)
    dec.Decode(cards)
    pretty.Println(cards);
  }


  // A connects with B, C, D
  // A creates thread with B, C, D

  // A posts X nessages

  // B, C, D see X messages

  // B posts Y messages

  // A, C, D see Y messages

  // C, D post/wait Z messages

  for _, act := range acts {
    var req *http.Request
    var err error

    req, err = http.NewRequest("DELETE", "http://localhost:7000/account/profile", nil);
    auth := base64.StdEncoding.EncodeToString([]byte(baseHandle + act + ":pass"))
    req.Header.Add("Authorization", "Basic "+auth)
    _, err = client.Do(req)
    if err != nil {
      fmt.Println(err)
      return
    }
  }


	flag.Parse()
	log.SetFlags(0)

	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt)

	u := url.URL{Scheme: "ws", Host: *addr, Path: "/status"}
	log.Printf("connecting to %s", u.String())

	c, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer c.Close()

	done := make(chan struct{})

	go func() {
		defer close(done)
		for {
			_, message, err := c.ReadMessage()
			if err != nil {
				log.Println("read:", err)
				return
			}
			log.Printf("recv: %s", message)
		}
	}()

	ticker := time.NewTicker(time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-done:
			return
		case t := <-ticker.C:
			err := c.WriteMessage(websocket.TextMessage, []byte(t.String()))
			if err != nil {
				log.Println("write:", err)
				return
			}
		case <-interrupt:
			log.Println("interrupt")

			// Cleanly close the connection by sending a close message and then
			// waiting (with timeout) for the server to close the connection.
			err := c.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, ""))
			if err != nil {
				log.Println("write close:", err)
				return
			}
			select {
			case <-done:
			case <-time.After(time.Second):
			}
			return
		}
	}
}

