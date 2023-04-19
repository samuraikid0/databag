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

  client := &http.Client{}
  acts := []string{ "A", "B", "C" }
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

