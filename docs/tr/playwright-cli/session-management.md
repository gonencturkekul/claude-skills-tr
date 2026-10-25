---
topic: session-management
title: Tarayıcı oturumlarını yönetmek
source: references/session-management.md
upstreamCommit: b1a5903c5b633b8c9f843ad7b629c2a78437040c
---
## Ne anlatır
Aynı anda birden çok yalıtılmış tarayıcı oturumu çalıştırmayı anlatır. `-s=ad` bayrağıyla her komut belirli bir oturuma gider. Her oturumun çerezleri, localStorage ve sessionStorage'ı, IndexedDB'si, önbelleği, geçmişi ve sekmeleri ayrıdır. Varsayılan oturum adı `PLAYWRIGHT_CLI_SESSION` ortam değişkeniyle de verilebilir. `list` oturumları gösterir, `close` ve `close-all` tarayıcıları kapatır, `kill-all` takılı kalan süreçleri zorla sonlandırır, `delete-data` profil verisini siler.

Profil varsayılan olarak bellekte tutulur, `--persistent` ya da `--profile` ile diske yazılır. Görünmez bir oturum bir saat komut almazsa kendiliğinden kapanır, süre `--idle-timeout` ile değişir. `attach` komutu yeni tarayıcı açmak yerine çalışan bir Chrome ya da Edge'e kanal adıyla, bir CDP adresiyle ya da Playwright eklentisiyle bağlanır. Kanal adıyla bağlanmak için hedef tarayıcıda uzaktan hata ayıklamaya izin verilmesi gerekir. `detach` bağlantıyı keser ama dış tarayıcıyı açık bırakır. Oturumlara amacını anlatan adlar vermek ve iş bitince temizlemek önerilir.

## Ne zaman işine yarar
- İki farklı kullanıcıyla aynı uygulamayı yan yana denemek istediğinde
- A/B varyantlarını ayrı oturumlarda karşılaştırırken
- Zaten açık olan kendi tarayıcında Claude'un çalışmasını istediğinde

## Örnek
```
Açık olan Edge tarayıcıma bağlan ve şu anki sekmedeki formu kontrol et
```

## İlgili konular
- `storage-state`: Bir oturumun durumunu dosyaya kaydedip başka bir oturuma taşımak için.
- `playwright-tests`: Duraklatılmış bir teste `attach` ile bağlanmak.
