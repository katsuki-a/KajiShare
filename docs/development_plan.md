# 作業計画書

このドキュメントは、家事シェアアプリ「KajiShare」の開発計画を定義します。
`requirements.md`と`remarks.md`の内容に基づき、具体的なタスクをフェーズごとに分割して記述します。

## Phase 0: プロジェクト基盤の構築

開発を開始する前に、基本的なプロジェクトのセットアップと共通コンポーネントの準備を行います。

- [x] **Gitリポジトリのセットアップ**
    - [x] GitHubリポジトリの作成
    - [x] `GEMINI.md`による開発ルールの定義
- [ ] **プロジェクト構造の確認**
    - [ ] `composeApp`モジュールの`commonMain`, `androidMain`, `iosMain`の役割分担を確認
- [ ] **UIテーマの定義 (commonMain)**
    - [ ] アプリケーション全体で使用する色（`ColorScheme`）を定義
    - [ ] タイポグラフィ（フォントサイズ、ウェイト）を定義
- [ ] **基本的な`expect`/`actual`のセットアップ**
    - [ ] プラットフォーム固有機能（例: UUID生成）のための基本的な`expect`/`actual`構造を準備

## Phase 1: 基本機能（ローカルでの家事記録）

まず、単一デバイス内で家事の記録と担当者の可視化ができる基本機能を実装します。

- [ ] **データモデルの定義 (commonMain)**
    - [ ] `HouseholdTask`: 家事の情報を保持するデータクラス（id, name）
    - [ ] `FamilyMember`: 家族の情報を保持するデータクラス（id, name）
    - [ ] `TaskRecord`: 家事の実行記録を保持するデータクラス（taskId, memberId, executionDate）
- [ ] **ローカルデータベースの実装**
    - [ ] KMP対応DBライブラリ`SQLDelight`の導入
    - [ ] `expect`/`actual`を用いて、共通コードからDB操作を行うためのインターフェースを定義
    - [ ] `androidMain`と`iosMain`で、それぞれのプラットフォーム用のDBドライバを実装
- [ ] **ビジネスロジックの実装 (commonMain)**
    - [ ] 家事のCRUD（作成、読み取り、更新、削除）ロジック
    - [ ] 家族メンバーのCRUDロジック
    - [ ] 家事の実行を記録し、次の担当者を計算するロジック（メンバーリスト順）
- [ ] **UIの実装 (commonMain)**
    - [ ] **家事一覧画面**
        - [ ] 登録されている家事の一覧を表示
        - [ ] 各家事の「最後にやった人」「次にやる人」を表示
        - [ ] 家事の完了を記録するボタンを設置
        - [ ] 新しい家事を追加するためのUI（例: FAB）
    - [ ] **家事追加・編集画面**
        - [ ] 家事の名前を入力するフォーム
    - [ ] **家族メンバー管理画面**
        - [ ] 家族メンバーの一覧表示と追加・編集・削除機能

## Phase 2: 通知機能（家事のやり忘れ防止）

家事の実行タイミングをユーザーに知らせるための機能を実装します。

- [ ] **データモデルの拡張 (commonMain)**
    - [ ] `HouseholdTask`に頻度（`frequency`）に関するプロパティを追加（例: `daily`, `weekly`, `every_x_days`）
- [ ] **UIの拡張 (commonMain)**
    - [ ] 家事追加・編集画面に、頻度を設定するためのUIコンポーネントを追加
- [ ] **通知スケジューリングロジック (commonMain)**
    - [ ] 家事の最終実行日と頻度設定に基づき、次の実行日を計算するロジック
- [ ] **通知機能のプラットフォーム固有実装 (`expect`/`actual`)**
    - [ ] `expect`で通知をスケジュールするためのインターフェース（`NotificationScheduler`）を定義
    - [ ] **`actual` (androidMain)**
        - [ ] `WorkManager`を使用して、指定時間にバックグラウンドタスクを実行
        - [ ] `NotificationManager`を使用して、ローカル通知を表示
    - [ ] **`actual` (iosMain)**
        - [ ] `UserNotifications.framework`を使用して、ローカル通知をスケジュール

## Phase 3: データ同期機能（マルチデバイス対応）

複数のデバイスでデータを共有するためのバックエンド連携機能を実装します。

- [ ] **バックエンドのセットアップ**
    - [ ] Firebaseプロジェクトを作成
    - [ ] `Authentication`と`Firestore`を有効化
    - [ ] AndroidおよびiOSアプリをFirebaseプロジェクトに登録し、設定ファイルを追加
- [ ] **Firebase連携のプラットフォーム固有実装 (`expect`/`actual`)**
    - [ ] `expect`でFirebaseとのデータ送受信を行うリポジトリインターフェースを定義
        - [ ] `AuthRepository`: ユーザー登録、ログイン、ログアウト
        - [ ] `FamilyGroupRepository`: 家族グループの作成、参加、メンバー管理
        - [ ] `TaskRepository`: 家事データと実行記録のFirestoreとの同期
    - [ ] **`actual` (androidMain)**
        - [ ] Android用のFirebase SDKを使用して、各リポジトリを実装
    - [ ] **`actual` (iosMain)**
        - [ ] iOS用のFirebase SDKを使用して、各リポジトリを実装
- [ ] **UIの実装 (commonMain)**
    - [ ] **アカウント登録・ログイン画面**
    - [ ] **家族グループ管理画面**
        - [ ] グループ作成、招待コード生成、グループ参加のためのUI
- [ ] **データ同期ロジックの統合 (commonMain)**
    - [ ] ViewModel層で、ローカルDB（オフライン時）とFirebaseリポジトリ（オンライン時）を連携
    - [ ] Firestoreのリアルタイム更新をリッスンし、UIに即時反映させる
