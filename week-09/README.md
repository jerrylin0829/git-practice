# 驗屍報告
Date: 2024-11-07
Authors: Jerry
Status: Compelte
Summary: Nginx not working properly
Root Causes: 
1. `/etc/nginx/nginx.conf` 第八行多了一個 `;`。
2. 80 port 被 `srv` 先佔用了。
3. 防火牆被新增規則，導致無法連上 server。
4. `index.html` 有設權限，所以無法直接存取。

Resolution:
1. 輸入 `systemctl status ningx.service` 查看錯誤訊息
![查看錯誤訊息](https://img.onl/8O8onW)

2. 把 `/etc/nginx/nginx.conf` 多出來的 `;` 刪掉。
![刪掉';'](https://img.onl/v45EUN)

3. 改好後再輸入一次 `systemctl status ningx.service` 查看錯誤訊息
![再次查看錯誤訊息](https://img.onl/6eO9ck)

4. 發現 80 port 已經被佔用，因此輸入 `sudo lsof -i :80` 查看
![查看誰佔用 80 Port](https://img.onl/Lsr1F9)

5. 發現是 `srv` 在佔用，因此輸入 `sudo systemctl stop srv`

6. 然後會變成 Nginx 連不上 80 port，因此查看防火牆
![查看防火牆](https://img.onl/TgBGbw)

7. 將防火牆規則刪除，輸入 `sudo iptables -D INPUT 1`
8. 輸入 `sudo chmod 777 /etc/iptables/rules.v4` 將寫入權限打開
9. 再輸入`sudo iptables-save > /etc/iptables/rules.v4`，保存防火牆關閉的規則。
10. 輸入 `sudo chmod 644 /etc/iptables/rules.v4` 將寫入權限關閉
11. 輸入 `sudo chmod 644 /var/myweb/index.html` 將權限打開
12. 輸入 `curl localhost` 就完成了。
![curl localhost](https://img.onl/KDWZ6C)

## 心得
第一次在課堂上直接實際操作。一開始聽到老師說要我們修復 nginx 其實怕怕的。因為以前從來沒有修過伺服器壞掉的經驗，所以一開始都不太敢下手，一看到錯誤訊息之後就問同組的組員說這應該是要怎麼改對吧？卻都不敢實際動手，深怕做錯就回不來了。

但一步一腳印的自己實際修復好幾個問題後，其實蠻有成就感的（雖然還是有跟組員討論）。我覺得這次修伺服器的經驗跟平常 debug 很不一樣，程式碼出錯只要看是哪行有問題去進行修改就好。但伺服器出錯雖然會丟到 log 檔，但還是要自己去理解是哪邊出了問題。動到防火牆的時候真的會很害怕像我上次的作業一樣，改錯就會釀成大錯，但好在最後還是有成功的將任務達成，成功修復。
