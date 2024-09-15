# 說明 blob, tree, commit, branch, head 分別是什麼

## Blob(Binary Large Object)
- Blob是Git中存儲單一檔案內容的物件。每次提交一個檔案，Git都會為它的內容建立一個Blob。
- 這個Blob不包含檔名或檔案位置，它只存儲檔案的原始內容。
- Blob是以檔案內容的***哈希值(SHA-1)***為識別碼的，這樣即使檔名改變，只要內容不變那麼哈希值也不會有所變化。

## Tree
- Tree是一個目錄結構的物件，它包 0含了對
多個Blob和其他Tree的引用，這些引用描述了檔案和子目錄之間的關係。
- Tree會顯示檔案系統的**目錄層次結構**。每次提交時，Git會建立一個Tree，這個Tree會包含該提交下所有的檔案(以Blob表示)以及它們的路徑。

## Commit
每次執行`git commit`，Git會生成一個新的Commit物件。每個物件包含以下內容：
- Tree：這個Commit的目錄狀態(只像一個Tree物件)。
- 父Commit：上一個Commit的哈希值(如果有parent的話)。
- 作者和提交的訊息：記錄誰在甚麼時間提交了甚麼變更。
*每個 Commit 都指向一個 Tree 物件，Tree 再指向多個 Blob 和子 Tree。這種結構讓我們可以追蹤每個版本中檔案的變動。*

## Branch
Branch是指向某一特定Commit的指標。當建立一個新的Branch時，Git只是創建了一個新的指標來指向某個Commit。
Branch的作用是讓我們可以同時進行多個版本的開發工作而不會互相干擾。
同時Branch也很輕量，因為他本質上只是一個指標，並不會複製整個專案。

## Head
Head是一個特殊的指標，指向當前檢出的Branch(或Commit)。當你切換到不同的Branch時，Head會跟著移動，指向新Branch的最新Commit。Head通常指向某個Branch，但它也可以指向一個具體的Commit，這種情況稱為**Detached HEAD**

![Git核心概念](https://img.onl/SNmDhO)

# 紀錄在 git repo 操作過程中，.git 檔案夾裡的變化，看看你可以觀察到什麼

## 1. 初始化 Git 儲存庫：`git init`
當執行`git init`，Git 會在專案目錄下建立一個`.git`資料夾。這個資料夾包含 Git 所需的資料結構。

`.git` 資料夾內容大致如下：

- `config`：儲存專案的 Git 設定。
- `description`：描述儲存庫（主要用於 Git Web 界面）。
- `HEAD`：指向當前檢出的分支。
- `hooks/`：Git hooks，包含預設的範例腳本。
- `info/`：包含排除檔案的設定檔（如 .gitignore 的設定）。
- `objects/`：存放所有的 Git 物件（Commit、Tree、Blob 等）。
- `refs/`：存放分支和標籤的指標。

## 2. 添加檔案：`git add`
當我執行 `git add README.md` 時，Git 會將檔案添加到「暫存區」中。在 `.git` 資料夾中，主要會更新 `index` 檔案，這個檔案儲存了暫存區的狀態。

變化觀察：
`objects/` 資料夾會新增 Blob 物件，這些 Blob 物件是我剛剛加入的 `README.md` 檔案內容的 SHA-1 哈希值的檔案。

## 3. 提交檔案：`git commit`
當我執行 `git commit`時，Git 會將有以下變化：

### 1. `objects/` 
變化：每次提交都會創建一個新的物件（blob、tree、commit 物件），這些物件會被存儲在 `objects/` 目錄中。物件的哈希值是根據其內容生成的，因此每個物件都有一個唯一的目錄。

觀察：可以看到 `objects/` 目錄下新創建的目錄和文件，這些文件是 Git 用來存儲提交內容的。

### 2. refs/ 
變化：提交後，`refs/` 目錄中的 `heads/` 子目錄會更新，記錄當前分支的最新提交哈希值。例如，`refs/heads/master` 文件將被更新以指向最新的提交。

觀察：在 `refs/heads/` 目錄下，可以看到指向最新提交的文件更新。

### 3. `HEAD` 
變化: `HEAD` 文件會被更新，記錄當前檢出的分支以及該分支的最新提交。它通常會包含對 `refs/heads/` 目錄中分支的引用。

觀察：在提交後，`HEAD` 文件中的內容會更新以反映新的提交狀態。

### 4. `index` 
變化：`index` 文件（或稱為暫存區文件）在提交後會被清空，因為所有已暫存的更改會被寫入到新的提交物件中。之後，`index` 文件會準備好接受新的更改。

觀察：提交後，`index` 文件中的內容會反映清空的狀態，並準備好接受下一次暫存。

### 5. `logs/` 
變化：`logs/` 目錄記錄了對 Git 引用（如分支）的所有操作。提交後，`logs/` 目錄下的相關文件會更新以反映提交歷史。

觀察：在 `logs/` 目錄下，您可以看到提交記錄和引用的更改日誌。

### 6. `config` 和 `description` 文件
變化：這些文件通常不會在每次提交時發生變化，但它們保存了 Git 倉庫的配置和描述資訊。

觀察：這些文件的內容可能在倉庫配置更改時發生變化，但在普通提交中不變化。

# commit message 應該怎麼寫比較好？應該有什麼 style 嗎？
- 做 `issue` 的時候，不應該一次 commit 所有異動，應該獨立 commit 每個不同意義的異動，這樣 commit 訊息才會跟異動的程式碼有關聯。
- 每次 `commit` 都是針對異動的檔案做說明：Why & What。這樣的 commit 訊息能讓日後進行維護人員更快進入狀況
- 每次 `commit` 都加上 `issue` 編號，方便追蹤程式異動的原因。
- 不能只把 Git 當作程式碼的 FTP，要把 Git 當作歷史查閱的工具才拿發揮 Git 的功能。