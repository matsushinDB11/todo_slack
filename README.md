# 技育Camp ハッカソンvol3 team1
ハッカソンで使用していたリポジトリがらフォーク

## 環境構築
GitCloneしてプロジェクトディレクトリ(todo_slack)に移動  
docker-compose up して下記の通り接続できるか確認  

localhost:3000 Node.js ("Welcome to Express" と表示される)  
localhost:3000/testdb (contenstableの内容が出力されるか確認。コネクションプールを使用していないので、再読み込みすると落ちる。)  
localhost:8080 phpmyadmin (DBコンテナの起動が遅いと接続失敗することあり。その場合少し待って再接続)

## 各ディレクトリの説明
/app: アプリケーション本体  
/db/init: データベースの初期データ投入用SQL

### 以下/app内の説明
/api: SlackAPI関連のコード  
/routes: Webアプリのサーバーサイド  
/views: Webアプリのクライアントサイド  
/public/stylesheets: スタイルシート  

## ブランチ運用ルール
webアプリ開発チームは"dev_web", SlackAPI開発チームは"dev_api"からそれぞれ  

- dev_web-作業名  
- dev_api-作業名  

でブランチを切って作業する。  
作業後はそのままリモートにプッシュ。（ローカルでマージしない）  
切り離した元のブランチにPullRequestを出す。(デフォルトのマージ先はmainブランチの点に注意)  
各チーム内でコードレビューしてマージ。  

## データベース
db/init/api-init.sql に初期データ投入用SQL  
各テーブルの定義は[データベース定義書](https://docs.google.com/spreadsheets/d/1yEc-2q_Qkn_qyD72VNzlY2g4Kw5G5azJIhhklzH8U5w/edit?usp=sharing) を参照

### データベース初期化の方法
docker-compose down --volume でdocker volume ごとコンテナを削除した後、  
docker-compose up する。  

### データベースの情報
.envに記述  
各コンテナの環境変数に設定済み  
Node.js コンテナでは  

- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_DATABASE

にそれぞれ設定  

```getdbinfo.js
process.env.hoge  
```

で取得できる。

### データベースへの接続

通常の接続は app/dbconnect.jsをインポートすることで呼び出せる。(参考: app/routes/test_output_db.js)
コネクションプールやセッションは各自実装する。
