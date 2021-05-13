SET CHARSET UTF8;
-- ユーザー情報
CREATE TABLE users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(20) NOT NULL,
  slack_id VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (id, user_name)
);

-- テスト用サンプルユーザー
INSERT INTO users (user_name, password) VALUES
    ('matsumoto01', 'abcd'),('kasukabe01', 'efgh'),
    ('sakaguchi01', 'ijkl'), ('kawase01', 'mnop');

-- タスク本体
CREATE TABLE contents (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT, -- 管理用id
    user_name INT UNSIGNED NOT NULL, -- タスクを入力したユーザーのid -- usersテーブルのid
    text TEXT NOT NULL, -- タスク名
    task_limit DATETIME DEFAULT NULL, -- タスク完了期限
    done TINYINT(1) DEFAULT 0, -- タスクが完了したか？ 0 => false, 0以外(通常1) => true
    PRIMARY KEY (id)
);

-- テスト用サンプルタスク
INSERT INTO contents (user_name, text) VALUES
    ('matsumoto01', 'データベース定義の作成'), ('kasukabe01', '認証周りの実装'),
    ('sakaguchi01', 'hoge'), ('kawase01', 'hogege'),
    ('matsumoto01', '初期SQL作成'), ('kasukabe01', '認証周りの検証'),
    ('sakaguchi01', 'fuga'), ('kawase01', 'fugaga');
