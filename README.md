# Traefik と Docker Compose による環境分離デモ

このプロジェクトはTraefikを使用して、本番環境（banananbo.com）と開発環境（lvh.me）を分離した最小限の構成例です。

## 概要

- **本番環境**: banananbo.com
- **開発環境**: lvh.me
- **使用技術**: Docker, Docker Compose, Traefik v2, Nginx

## セットアップ

### 前提条件

- Docker と Docker Compose がインストールされていること
- ローカル開発の場合は、`lvh.me`（127.0.0.1 へのエイリアス）を使用
- 本番環境では、DNSで`banananbo.com`がサーバーに向いていること

### 起動方法

```bash
# プロジェクトを起動
docker-compose up -d

# ログの確認
docker-compose logs -f
```

## 動作確認

- 開発環境: http://lvh.me/ にアクセス
- 本番環境: http://banananbo.com/ にアクセス
- Traefik ダッシュボード: http://localhost:8080/ にアクセス

## プロジェクト構造

```
.
├── docker-compose.yml        # Docker Compose設定
├── traefik/                  # Traefik関連ファイル
│   ├── conf/                 # Traefik設定
│   │   ├── traefik.yml       # メイン設定
│   │   └── dynamic/          # 動的設定
│   │       └── tls.yml       # TLS設定
│   └── certs/                # 証明書保存用
└── web/                      # Webアプリケーション
    └── html/                 # 静的ファイル
        └── index.html        # デモページ
```

## 注意事項

- 本番環境では、適切なTLS証明書の設定が必要です
- このデモでは、HTTPのみを使用しています。HTTPSを有効にするには追加の設定が必要です 