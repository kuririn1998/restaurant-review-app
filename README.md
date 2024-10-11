# Restaurant Review App

This is a full-stack restaurant review application. The frontend is built with **Next.js** and the backend is powered by **NestJS**. Users can browse and submit reviews for various restaurants.

## Directory Structure
```bash
root/
├── backend/                             # バックエンドのディレクトリ
│   ├── src/                             # ソースコード
│   │   ├── app.controller.ts            # エンドポイントのロジックを定義
│   │   ├── app.module.ts                # アプリケーションモジュールの定義
│   │   ├── app.service.ts               # ビジネスロジックを担当するサービス層
│   │   ├── main.ts                      # アプリケーションのエントリーポイント
│   ├── test/                            # テスト関連ファイル
│   │   ├── app.e2e-spec.ts              # End-to-Endテストファイル
│   ├── .eslintrc.js                     # ESLintの設定ファイル
│   ├── package.json                     # バックエンドの依存関係とスクリプト
│   ├── tsconfig.json                    # TypeScriptのコンパイル設定
│   ├── tsconfig.build.json              # TypeScriptのビルド用設定
│   ├── dist/                            # コンパイル後の出力ディレクトリ
│   └── node_modules/                    # Node.jsの依存関係
├── frontend/                            # フロントエンドのディレクトリ
│   ├── src/                             # ソースコード
│   │   ├── pages/                       # Next.jsの各ページコンポーネント
│   │   └── styles/                      # CSSスタイル
│   ├── public/                          # 静的ファイル（画像やファビコンなど）
│   │   ├── favicon.ico                  # ファビコンファイル
│   │   └── next.svg                     # Next.jsのロゴ
│   ├── .env                             # 環境変数ファイル
│   ├── next.config.mjs                  # Next.jsのカスタム設定ファイル
│   ├── package.json                     # フロントエンドの依存関係とスクリプト
│   ├── tsconfig.json                    # フロントエンドのTypeScript設定
│   └── node_modules/                    # Node.jsの依存関係
├── .gitignore                           # Gitにコミットしないファイルを定義
├── .prettierrc                          # Prettierの設定ファイル
├── README.md                            # プロジェクトの概要と説明
├── package.json                         # ルートプロジェクトの依存関係とスクリプト
├── tsconfig.json                        # TypeScriptのルート設定ファイル
├── nest-cli.json                        # NestJS CLIの設定ファイル
└── node_modules/                        # ルートのNode.js依存関係

```

## Prerequisites

- Node.js (version 19.3.0 or higher)
- MySQL
- AWS account (for S3 storage)
- npm or yarn

## Project setup
Monorepo構成
このプロジェクトは、Yarnワークスペースを使用して管理されたMonorepo構成を採用しており、backendディレクトリにNestJSアプリケーション、frontendディレクトリにNext.jsアプリケーションがそれぞれ配置されています。

依存関係のインストール
最初に、backendとfrontend両方の依存関係をインストールします：
```bash
$ yarn install
```

このコマンドにより、npmワークスペースを使用して両方のディレクトリの依存関係が自動的にインストールされます。

アプリケーションの実行
package.jsonに定義されているスクリプトを使用して、backend（NestJS）とfrontend（Next.js）の両方を個別に、または同時に実行することができます。

**バックエンド（NestJS）の実行**
NestJSバックエンドを開発モードで実行するには：
```bash
$ yarn workspace backend run start:dev
```
バックエンドを本番用にビルドするには：
```bash
$ yarn workspace backend run build
```
本番環境でバックエンドを実行するには：
```bash
$ yarn workspace backend run start
```

**フロントエンド（Next.js）の実行**
Next.jsフロントエンドを開発モードで実行するには：
```bash
$ yarn workspace frontend run dev
```
フロントエンドを本番用にビルドするには：
```bash
$ yarn workspace frontend run build
```
本番環境でフロントエンドを実行するには：
```bash
$ yarn workspace frontend run start
```

**バックエンドとフロントエンドの同時実行**
バックエンドとフロントエンドを同時に開発モードで実行するには、2つのターミナルウィンドウを使用します：
1つ目のターミナルでバックエンドを実行：
```bash
$ yarn workspace backend run start:dev
```
2つ目のターミナルでフロントエンドを実行：
```bash
$ yarn workspace frontend run dev
```
