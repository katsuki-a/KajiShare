# Compose Multiplatform開発における技術的制約と考慮点

## 概要

このアプリをCompose Multiplatformで開発することは良い選択肢ですが、重要な技術的制約が存在します。
UIとビジネスロジックの大部分は共有可能ですが、OS固有の機能（通知、バックグラウンド処理など）はプラットフォームごとに個別の実装が必要です。

---

## UIと共有ロジック (共有可能な部分)

Compose Multiplatformの最大の利点は、UIのコードをAndroidとiOSでほぼ完全に共有できる点です。ボタン、リスト、画面遷移などのUIコンポーネントや基本的な動作は、一度記述すれば両プラットフォームで機能します。

また、家事の担当者計算ロジックや日付処理などのビジネスロジックも、共通のKotlinコードとして共有可能です。これにより、開発効率とコードの一貫性が大幅に向上します。

---

## プラットフォーム固有の実装が必要な機能

今回のアプリ要件の中で、特に以下の機能はCompose Multiplatformの共有コードだけでは実装できず、AndroidとiOSそれぞれのネイティブAPIを呼び出す必要があります。

### 1. 通知機能 (ローカル通知とプッシュ通知)
通知はOSが管理する機能の代表例です。
- **Android**: `NotificationManager` を使用した実装が必要です。
- **iOS**: `UserNotifications.framework` を使用したSwift/Objective-Cでの実装が必要です。

### 2. バックグラウンド処理
Phase 2で検討した「ポーリング方式」のためのバックグラウンド処理も、OSごとに仕組みが全く異なります。
- **Android**: `WorkManager` を利用して定期的なタスクをスケジュールします。
- **iOS**: `Background App Refresh` の仕組みに則って実装する必要があり、OSによって実行タイミングが厳しく制限されます。

### 3. データベース (特にFirebase)
- **ローカルデータベース**: `SQLDelight` のようなKotlin Multiplatform (KMP)対応ライブラリを使えば、データベース関連のコードも高いレベルで共有できます。
- **クラウドデータベース (Firebase)**: Firebaseの公式SDKはAndroid用とiOS用で分かれています。KMPからFirebaseを利用するには、コミュニティが開発しているラッパーライブラリを利用するか、各プラットフォームでFirebaseを操作するコードをそれぞれ記述する必要があります。

---

## 開発のアプローチ (`expect` / `actual`)

これらのプラットフォーム間の差異に対応するため、KMPでは **`expect` / `actual`** という仕組みを利用します。

1.  **`expect` (期待する)**: 共有コード側で、機能のインターフェース（設計図）を`expect`キーワードで定義します。（例: `expect class Notifier`）
2.  **`actual` (実際の)**: AndroidとiOSそれぞれのソースコード側で、そのインターフェースをプラットフォーム固有のAPIを使って`actual`キーワードで実装します。

## まとめ

Compose Multiplatformは、UIとビジネスロジックを共有することで開発を効率化できる強力なフレームワークです。

しかし、通知、バックグラウンド処理、ネイティブSDK連携（Firebaseなど）といったOSに深く関わる機能については、プラットフォームごとの知識とネイティブコードの実装が不可欠となります。開発者はAndroid StudioとXcodeの両方の開発環境に習熟し、それぞれのOSの特性を理解している必要があります。