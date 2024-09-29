## 1. 觀察 package.json 的變化
- 在 `npm init` 之後生成package.json檔如下
![npm init之後](https://img.onl/TrHWeW)

- 在 `npm install express` 之後package.json檔新增了 
```JavaScript
"dependencies": {"express": "^4.21.0"}
```
![npm install express之後](https://img.onl/K02AYH)

## 2. 觀察 node_modules 裡面有什麼
### 1. Express 本身
- express：這是你安裝的核心模組，它包含 Express 框架的主代碼，用於構建 web 應用。

### 2. Express 的依賴庫
Express 依賴其他庫來提供完整的功能，這些庫會一併被下載並存放在 `node_modules` 目錄中，例如：
- `accepts`：用來處理 HTTP Accept 頭信息。
- `array-flatten`：用來將多層嵌套的數組扁平化。
- `body-parser`：解析請求體，通常用於處理 JSON 和 URL 編碼的表單數據。
- `cookie-signature`：用於對 cookie 進行簽名的工具。
- `debug`：一個調試工具，幫助你在開發時追蹤應用程式的運行。
- `qs`：一個強大的查詢字符串解析器，用來處理 URL 中的查詢參數。
- `serve-static`：用來處理靜態文件的模組。
- `vary`：用於處理 HTTP Response Header 中的 `Vary` 字段。

### 3. 其他依賴的子模組
由於這些 Express 的依賴庫本身也可能依賴其他庫，`node_modules` 目錄會形成一個嵌套的樹狀結構，每個模組都可能有自己的依賴。

## package.json 中的 dependencies 與 devDependencies 分別是什麼
### 1. dependencies：
- 定義：`dependencies` 是你的應用在 運行時 所依賴的套件。也就是說，這些套件在應用程序的正常運行中是必須的。
- 用途：這些模組會在你部署應用程序到生產環境（production）時被安裝，因為應用程式在運行時需要它們。例如，`express` 就是一個典型的 `dependencies`，因為它是用來處理 HTTP 請求的核心框架。
- 安裝指令：當你執行 `npm install` 時，`dependencies` 會自動安裝。
- 定義方式：
```json
{
  "dependencies": {
    "express": "^4.17.1",
  }
}
```
這裡的 `express` 是運行時必須的模組。
### 2. devDependencies：
- 定義：`devDependencies` 是你的應用在 開發階段 所依賴的套件。這些模組是開發人員在開發或測試應用時使用的，但在應用程序部署到生產環境時並不是必須的。
- 用途：典型的 `devDependencies` 包括測試框架（如 `mocha`）、代碼壓縮工具（如 `webpack`），它們在應用的運行時不會被使用，只在開發或測試過程中用到。
- 安裝指令：你可以用 `npm install` 安裝所有套件，但如果只想安裝 `devDependencies`，可以使用 `npm install --only=dev`。如果不想安裝 `devDependencies`（如在生產環境中），可以使用 `npm install --only=prod`。
- 定義方式：
```json
{
  "devDependencies": {
    "mocha": "^8.2.1",
    "webpack": "^5.41.0"
  }
}
```
這裡的 `mocha` 和 `webpack` 是開發時才需要的工具。

## package.json 中的 scripts 這個區塊怎麼用？
在 `package.json` 中，`scripts` 區塊用來定義一些可以通過命令行執行的腳本命令。這些腳本可以幫助我自動化日常任務，例如啟動伺服器、運行測試、打包應用等。這樣可以不用每次都輸入完整的命令，只需要執行簡單的腳本名稱即可。

### 1. 基本結構
scripts 區塊是 JSON 格式的 key-value 對，key 是腳本的名稱，value 是要執行的命令。例如：
```json
{
  "scripts": {
    "start": "node app.js",
    "test": "mocha",
  }
}
```
### 2. 常見腳本
- start：一個特定的腳本名稱，用來啟動應用程式。你可以使用 `npm start` 來執行這個腳本，當執行 `npm start` 時，會默認執行 `"start"` 指定的命令。
    - 例如：
    ```json
    "start": "node app.js"
    ```
    - 執行命令：`npm start`

- test：另一個常見的腳本名稱，用來執行測試。當執行 npm test 時，會自動執行 "test" 指定的命令。
    - 例如：
    ```json
    "test": "mocha"
    ```
    - 執行命令：`npm test`

## Port number 要怎麼以環境變數來設定？
### 1. 通過命令行設置環境變數
- 執行命令: `PORT=xxxx node app.js`
若直接執行 `node app.js`，則會使用默認值。
詳細程式碼可以看 `/app.js`。

### 2. 使用 `.env` 文件來設置環境變數
如果你想避免每次都在命令行設置環境變數，可以使用 `.env` 文件來設置環境變數，並使用 `dotenv` 套件來自動加載環境變數。

步驟如下：

安裝 dotenv 套件：

```bash
npm install dotenv
```

創建 `.env` 文件：
在項目根目錄下創建一個 `.env` 文件，並寫入你要設置的環境變數：

```makefile
PORT=5000
```

修改 `app.js` 來載入 `.env` 文件：
在 `/app.js` 中的最頂部引入 `dotenv`，這樣它會自動加載 `.env` 文件中的變數：

```javascript
require('dotenv').config();
```

## 關於哪些檔案應該要被放上 github repo 這個問題，描述看看為什麼你選擇上傳某些檔案、選擇不上傳某些檔案，決策的要素是什麼？
### 1. 專案的必要檔案應上傳
- 需要確保**專案的核心代碼**和**必需的配置文件**都被上傳，這樣其他開發者或系統可以重現並運行我的應用。例如：
    - 應用的程式碼（如 `.js`、`.html`、`.css` 等檔案）。
    - `package.json`：列出了專案的依賴包及其版本，其他人可以根據這個文件來安裝相同的依賴項目。
    - `.env.example`：上傳一個示範的環境變數文件，用來告訴其他人應如何配置環境變數（但不要上傳真實的 `.env` 文件，它可能包含敏感資訊，如 API 金鑰）。

### 2. 生成的檔案、外部依賴不應上傳
- 一些檔案是運行時或安裝時自動生成的，這些檔案不需要上傳，因為它們可以在開發過程中重新生成，並且佔用不必要的儲存空間或會導致儲存庫變得混亂。比如：
    - `node_modules/` 文件夾：它包含所有的外部依賴包，會根據 `package.json` 安裝。因為這些依賴包可以通過 `npm install` 自動安裝，所以不需要將它們上傳到儲存庫。
    - `package-lock.json`：這個檔案記錄了安裝時精確的依賴版本。雖然它是「生成檔案」，但一般情況下還是建議保留並上傳到儲存庫。這樣能確保在不同的環境中安裝的依賴版本保持一致，特別是如果你的應用對某些依賴包的精確版本有要求。

### 3. 敏感資料不應上傳
- 敏感資料（如密碼、API 金鑰、用戶憑證等）絕不應該上傳到儲存庫，這是為了避免信息洩露。通常，這類敏感資訊會存放在 `.env` 文件中。你應該確保這些檔案被添加到 `.gitignore`，以避免意外上傳。

### 4. 編譯產物不應上傳
- **編譯結果**或**打包結果**也不應該上傳，例如，當你使用打包工具（如 `Webpack`、`Babel` 等）時，生成的檔案（如 `dist/` 文件夾）不應該被提交，因為這些檔案可以根據原始碼和配置重新生成。

### 5. 使用 .gitignore 避免上傳不需要的檔案
- `.gitignore` 文件 是控制哪些檔案或文件夾不應該被提交到 Git 儲存庫的最佳工具。你可以在其中列出不需要上傳的檔案，如：
```bash
node_modules/
.env
```
## 範例程式中用 require，但上週的 Stack 是用 import/export，這兩種分別是 JavaScript 引用模組的兩種方式: CJS vs ESM，這兩者分別怎麼用？
JavaScript 中有兩種主要的模組系統：CommonJS (CJS) 和 ECMAScript Modules (ESM)。它們是引用和導出模組的兩種不同方式，分別用於不同的情境。以下是它們的區別和使用方式：

1. CommonJS (CJS)
- 使用方式：require 和 module.exports
- 適用場景：傳統上是 Node.js 預設的模組系統。
- 語法：
    - 用 require() 來引用模組。
    - 用 module.exports 或 exports 來導出模組。

### 範例：引用和導出模組（CJS）
### moduleA.js：
```javascript
// 導出模組
const greet = () => {
  console.log('Hello World!');
};

module.exports = greet;
```

### main.js：
```javascript
// 引用模組
const greet = require('./moduleA');
greet(); // 輸出：Hello World!
```

## 2. ECMAScript Modules (ESM)
- 使用方式：`import` 和 `export`
- 適用場景：這是原生 JavaScript 的模組系統，適用於現代瀏覽器和 Node.js。
- 語法：
    - 用 `import` 來引用模組。
    - 用 `export` 或 `export default` 來導出模組。

### 範例：引用和導出模組（ESM）
### moduleB.js：
```javascript
// 導出模組
export function greet() {
  console.log('Hello from ECMAScript Modules!');
}
```

### main.js：
```javascript
// 引用模組
import { greet } from './moduleB.js';
greet(); // 輸出：Hello from ECMAScript Modules!
```

## 主要差異
### 1. 語法
- CJS 使用 `require()` 來引入模組，`module.exports` 或 `exports` 來導出。
- ESM 使用 `import` 和 `export` 關鍵字來引入和導出模組，語法上更具表達性。

### 2. 同步 vs 異步
- CJS 模組是同步加載的。這意味著 `require()` 在引用模組時，會立刻執行並返回模組的內容。
- ESM 支持異步加載，特別是在瀏覽器中，可以通過 `<script type="module">` 引入模組，並允許基於 `import()` 的動態加載。

### 3. 模組範圍
- CJS 是專門為 Node.js 設計的，瀏覽器端不原生支持 CJS 。
- ESM 是 JavaScript 標準，現代瀏覽器和Node.js都支持 ESM。

### 4. 導出方式
- CJS 將整個模組作為單一對象導出，通常是 `module.exports`，你可以導出多個函數或變量。
- ESM 支持命名導出（`export`）和默認導出（`export default`），更加靈活和語法嚴格。

## 如何在 Node.js 中使用 ESM？
在 Node.js 中，要使用 ESM，你需要：

### 1. 設定 package.json：
- 加入 `"type": "module"`，這樣 Node.js 就會將 `.js` 文件當作 ESM 處理。
```json
{
  "type": "module"
}
```
### 2.ESM 中的文件擴展名：
- 在使用 ESM 的情況下，必須使用完整的文件路徑，例如 `import { something } from './moduleB.js';`，不能省略 `.js` 後綴。

# 進階題
## localhost 是什麼？
`localhost` 是一個網路術語，指的是**本地電腦**。當你在瀏覽器中輸入 `localhost` 或是用程式連接到 `localhost`，實際上你是在連接自己的電腦。它通常用來測試和開發網路應用程式，而不需要依賴外部的網絡。

### 具體來說：
`localhost` 對應的 IP 地址通常是 `127.0.0.1`，這是標準的**loopback**（回送）地址，用來指向本機。
當一個網路伺服器（如 Node.js 的 Express 應用）在本機運行時，你可以使用 `localhost` 和指定的埠號（如 `localhost:3000`）來訪問該伺服器。

## curl 是什麼？查查看怎麼用 curl 來測試網路連線？常用參數有哪些？
`curl` 是一個用於從命令行（或腳本中）傳輸數據的工具。它支持多種協議，包括 HTTP、HTTPS、FTP 等。開發者經常使用 `curl` 來測試和調試 API、檢查伺服器狀態，以及執行網絡請求。

### 常用參數
1. `-I` 或 `--head`：只請求 HTTP 標頭
```bash
curl -I http://example.com
```
這會只顯示回應的 HTTP 標頭資訊，如狀態碼、Content-Type 等，而不顯示實際的內容。

2. `-X`：指定 HTTP 方法
```bash
curl -X POST http://example.com
```
這條命令發送一個 `POST` 請求。你可以用這個選項來指定其他方法，如 `PUT`, `DELETE`, `PATCH`。

3. `-d` 或 `--data`：發送表單數據
```bash
curl -d "username=user&password=pass" http://example.com/login
```
這會模擬一個 `POST` 請求，向 `http://example.com/login` 發送數據（常見於提交表單）。


4. `-H`：添加自定義 HTTP 標頭
```bash
curl -H "Content-Type: application/json" http://example.com
```
這條命令會在請求中加入自定義標頭，這在發送 API 請求時很常見。

5. `-o`：將回應內容保存到文件
```bash
curl -o output.html http://example.com
```
這會將 `http://example.com` 的回應保存到 `output.html` 文件中。

6. `-L` 或 `--location`：自動跟隨重定向
```bash
curl -L http://example.com
```
如果伺服器返回 3xx 重定向狀態碼，這個參數會讓 `curl` 自動跟隨重定向鏈接。

7. `-u`：提供基本身份驗證
```bash
curl -u username:password http://example.com
```
這會通過基本的 HTTP 驗證發送帳號和密碼。

8. `-v` 或 `--verbose`：顯示詳細請求和回應過程
```bash
curl -v http://example.com
```
這會詳細列出整個 HTTP 請求和回應過程，包括請求的內容、回應的標頭等。

9. `-k` 或 `--insecure`：忽略 HTTPS 證書驗證
```bash
curl -k https://example.com
```
這條命令忽略 SSL 證書的驗證，對於自簽證書的伺服器測試很有用，但在生產環境下應該謹慎使用。

10. `-s` 或 `--silent`：隱藏進度條
```bash
curl -s http://example.com
這會讓 curl 靜默運行，不顯示任何進度條或錯誤訊息，這在腳本中使用 curl 時會比較乾淨。
```

### 範例：測試網路連線
```bash
curl -I http://example.com
```