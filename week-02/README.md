# Node.js 安裝的版本，為甚麼?
## 01 - Node.js版本: v22.9.0 (Current)
其實會安裝這個版本是最簡單的原因是因為他是最新的版本(雖然說有時候最新的不一定是好的，會有一些套件還沒更新等等的情況發生)。
但我有稍微查一下此版本優化的內容，優化或新增的有: 
- require() 同步ESM (experimental-require-module)
    - 明確標記ES模組，在package.json中有 `"type":"module`字段或`.mjs`擴展名。
    - 完全同步(不包含頂層的await)。
    - require()加載請求的module作為ES module時，類似於**動態的import()**，但是是同步運行並直接返回名稱空間對象。
- 將Stream默認高水位標記(High-Water Mark)從**16KB**增加到**64KB**
    - 這會在些微增加內存使用的情況下**提高效能**(還不太理解HWM實際使用情況，未來會再細細品嘗)。
- `node --watch` 達到 stable 穩定狀態
    - 在Watch模式下，被觀察的文件更改會導致Node.js重新啟動。
- WebSocket 客戶端
    - 之前在 `--experimental-websocket`後的瀏覽器兼容Websocket實現Default啟用。提供Node.js一個無須外部依賴的WebSocket客戶端。
- 提高`AbortSignal`創建的效能
    - 提高此效能，顯著的提高`fetch`和測試運行器的效能
    (此部分一樣未來細細品嘗)

# NVM, NPM分別是甚麼?
## NVM (Node Version Manager)
### 指的是Node的版本管理器
簡單來說就是可以管理自己的 Node 版本的工具，想用哪個版本，就用哪個版本，而且操作容易。
(網路上說感覺有點像是python的pipenv)。

- NVM 允許安裝、切換和使用不同版本的 Node.js。
- 比如，某個專案需要 Node.js 12 版本，另一個專案需要 14 版本，可以通過 NVM 輕鬆切換。
- 可以避免版本衝突，在不同專案間自由工作，無需擔心 Node.js 版本的問題。
## NPM (Node Package Manager)
### 指的是Node的套件管理器，是Node.js預設的，以JavaScipt編寫的
- 開發者使用 NPM 來 安裝、更新 和 分享 可重複使用的程式碼。
- NPM 讓我們更容易管理專案所需要的相依性（外部的程式碼）。
- 像是如果我在建立一個網站，並且需要使用 React.js，可以使用 NPM 來快速下載並將它加入專案中。