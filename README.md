# 記帳軟體範例

這是一個簡易的 Node.js 記帳軟體範例，提供以下功能：

- 帳戶管理：新增與列出帳戶。
- 收支紀錄：新增收入、支出或轉帳交易並自動更新帳戶餘額。
- 基本統計圖表：產生支出圓餅圖與餘額趨勢圖。

資料會儲存在 `db.json`，執行 `npm start -- <command>` 使用 CLI。

## 常用指令

```bash
# 新增帳戶
npm start -- add-account "薪資帳戶" bank

# 新增支出
npm start -- add-transaction -a <帳戶ID> -m 100 -k expense -c 食物 -n 午餐

# 列出帳戶
npm start -- list-accounts

# 產生支出圓餅圖
npm start -- pie pie.png
```
