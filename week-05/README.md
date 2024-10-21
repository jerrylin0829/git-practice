## 1. 你的網址，應該是 https://www.xxx.xxx，點擊過去應該要可以看到個人作業 4 架設的 Express server （由 Nginx proxy 到 Express）
- [https://jerry.urcafemate.me](https://jerry.urcafemate.me)

## 2. 你在哪裡購買網域的
- NameCheap (感謝同學推薦)

## 3. DNS 的 A record 是什麼？
DNS A Record（Address Record）是 DNS（Domain Name System）的一種記錄類型，用來將網域名稱（例如 `www.example.com`）解析為對應的 IPv4 地址。當輸入一個網域名稱時，A Record 會告訴 DNS 伺服器該網域所對應的伺服器 IP 地址，從而允許瀏覽器連接到該伺服器來訪問網站。

A Record 的作用：
- 域名到 IP 地址的映射：它將易於記憶的域名（例如 `example.com`）映射到對應的數字化 IP 地址（例如 `192.168.1.1`）。
- 僅支持 IPv4：A Record 將域名解析為 IPv4 地址。如果要解析到 IPv6 地址，則需要使用 AAAA Record。

## 4. DNS 的 NS record 是什麼？
DNS NS Record（Name Server Record）是 DNS 記錄的一種，指示哪個 DNS 伺服器負責解析該域名的查詢。簡單來說，它告訴互聯網應該查詢哪個 DNS 伺服器來獲取該域名的相關記錄（如 A 記錄、MX 記錄等）。

NS Record 的作用：
- 指定負責的 DNS 伺服器：NS 記錄用來指定負責解析特定域名的權威 DNS 伺服器。如果有人查詢我的域名，系統會根據 NS 記錄指向的 DNS 伺服器來獲取正確的 IP 地址或其他相關記錄。
- 權威性 DNS 伺服器：NS 記錄通常指向一組權威 DNS 伺服器，這些伺服器負責儲存並提供該域名的其他 DNS 記錄。

## 5. Domain Name vs FQDN vs URL 這三者分別為何？
### 1. Domain Name（網域名稱）
Domain Name 是網絡中用來標識一個網站或服務器的易於記憶的名稱，它對應一個 IP 地址。域名由一系列字符串組成，這些字符串由點 (`.`) 分隔。每個域名的層級從右到左依次表示：
- 根域：根級別的域名，通常表示為一個隱藏的點 (`.`)，用戶通常看不到。
- 頂級域名（TLD）：這是域名結構中的最右邊部分，例如 `.com`、`.org`、`.net`、`.edu`，以及國家代碼（如 `.tw` 代表台灣）。
- 次級域名（Second-Level Domain, SLD）：頂級域名之前的部分，通常是註冊的網域名稱，例如 `example`。
- 子域名：在次級域名之前的部分，通常可以自由創建，例如 `www` 是最常見的子域名。

範例：
- `example.com` 是一個域名，其中 `example` 是次級域名，`.com` 是頂級域名。
- `www.example.com` 包含了子域名 `www`。

### 2. FQDN (Fully Qualified Domain Name，全域網域名稱)
FQDN 是一個完整的、從根域到具體主機的網域名稱。它具體指出了網路中某個設備或伺服器的完整位置。與單純的域名不同，FQDN 必須包含所有級別，包括主機名、域名，以及頂級域名，最終以一個隱藏的根點結束。
組成部分：
- 主機名（Host Name）：設備的名稱，例如 `www` 或 `mail`。
- 域名：例如 `example.com`。
- 頂級域名：例如 `.com`。
- 根域：隱含的一個根點 (`.`)，它表示 FQDN 的結尾。

範例：
`www.example.com.` 是一個 FQDN，其中 `www` 是主機名，`example.com` 是域名，並以隱藏的根點結束。
`mail.google.com.` 也是一個 FQDN，它指向 Google 的郵件伺服器。

### 3. URL (Uniform Resource Locator，統一資源定位符)
URL 是一個完整的定位符，用來指定互聯網上的某個具體資源。URL 不僅包含域名或 FQDN，還包含具體的路徑和協議（如 HTTP、HTTPS、FTP 等），從而指向網頁、文件或其他資源。
URL 的組成：
- 協議（Protocol）：指定如何與資源通信的協議，例如 `http://` 或 `https://`。
- FQDN 或域名：用來定位伺服器的部分，例如 `www.example.com` 或 `example.com`。
- 路徑（Path）：指定具體的資源位置，例如 `/about` 或 `/images/pic.jpg`。
- 端口號（Port）（可選）：與伺服器通信的端口號，例如 `:80` 或 `:443`。
- 查詢參數（可選）：用來傳遞額外信息，例如 `?id=123&lang=en`。

範例：
- `https://www.example.com/about`
    - `https://` 是協議，
    - `www.example.com` 是域名（也可以是 FQDN），
    - `/about` 是路徑，指向網站上的 "about" 頁面。

## 6. 為什麼應該要為網站加上憑證？而不是直接用 http 就好？
### 1. 加密數據傳輸
HTTPS 使用 SSL/TLS 加密協議來保護用戶和服務器之間的通信。這確保了數據在傳輸過程中不被攔截或竊取。

- HTTP：數據以明文形式傳輸，任何人都可以攔截並讀取數據。
- HTTPS：數據被加密，即使被攔截，沒有正確的解密密鑰也無法讀取。

### 2. 防止數據篡改
HTTPS 不僅加密數據，還能防止數據在傳輸過程中被篡改。這確保了數據的完整性，駭客無法在不被發現的情況下修改傳輸中的信息。

- 在 HTTP 上，攻擊者可以進行「中間人攻擊」（MITM），篡改數據或注入惡意代碼。
- 在 HTTPS 上，這種攻擊很難實現，因為數據已被加密和驗證。

### 3. 身份驗證和信任
SSL/TLS 憑證還提供了服務器的身份驗證。這意味著它可以保證用戶正在訪問的網站是他們所期望的網站，而不是一個假冒的釣魚網站。

- HTTP 沒有身份驗證機制，攻擊者可以偽裝網站，欺騙用戶提交敏感信息。
- HTTPS 通過第三方憑證機構（CA）驗證服務器身份，保證用戶訪問的是真正的網站。

### 4. 提升 SEO 排名
Google 等搜索引擎會優先考慮使用 HTTPS 的網站，使用 HTTPS 的網站在搜索結果中更有可能排在前面。

- 自 2014 年起，Google 就已經將 HTTPS 作為一個 SEO 排名因素。因此，使用 HTTPS 可以提高網站的可見度和排名，吸引更多流量。

5. 避免瀏覽器警告
現代瀏覽器（如 Chrome、Firefox）會對使用 HTTP 的網站顯示「不安全」警告，這會降低用戶對網站的信任感。

- 如果網站沒有 SSL 憑證，瀏覽器會在地址欄中顯示「不安全」提示，可能導致用戶離開網站。
- 如果使用 HTTPS，瀏覽器會顯示「鎖」的圖示，表示網站是安全的。