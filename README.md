# 老爸的私房錢

建立私人記帳清單

## Features
1.  使用者可以建立自己的帳號
2.  使用者可以使用自己的Facebook帳號登入
3.  使用者可以輸入「名稱」、「類別」、「日期」 與「金額 」，建立記帳清單
4.  使用者可以瀏覽全部的記帳清單
5.  使用者可以新增一筆帳單
6.  使用者可以刪除一筆帳單
7.  使用者可以修改一筆帳單資訊
8.  使用者可以使用「年」、「月」、「日」 與「類型」顯示
9.  使用者可以看見總額

## 安裝環境

+ Node.js v10.15.3
+ Express ^4.17.1
+ Express-handlebars ^3.1.0
+ mongoose ^5.6.11
+ nodemon ^1.19.2
+ method-override ^3.0.0
+ bcryptjs ^2.4.3
+ connect-flash ^0.1.1
+ dotenv ^8.1.0
+ express-session ^1.16.2
+ method-override ^3.0.0
+ body-parser ^1.19.0
+ passport ^0.4.0
+ passport-facebook ^3.0.0
+ passport-local ^1.0.0

## 安裝步驟
1. 依照git clone下載資料夾
```
$ git clone https://github.com/KerwinJhong/expense-tracker.git
```
2. 從終端機安裝npm套件，輸入以下指令
```
$ npm install
```
3. 開啟本地 MongoDB 資料庫
```
$ npm run dev
```
4. 建立預設餐廳資料
```
$ [~/expense-tracker/models/seeds] node run seeder
```
5. 執行專案
```
$ [~/expense-tracker] npm run dev
```
6. 輸入網址並呈現我的餐廳清單介面
```
http://localhost:3000
```

## 專案內容
+ 餐廳所有清單
![image](https://github.com/KerwinJhong/expense-tracker/blob/master/KerwinWeb.png)

## 預設使用者資訊
```
user1：
email: mom@example.com
password: 12345678

user2：
email: dad@example.com
password: 12345678
```

## 作者
[Kerwin Jhong](https://github.com/KerwinJhong)

