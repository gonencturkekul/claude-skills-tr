---
command: craft
title: Eski kısayol
source: reference/craft.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
`craft` artık kullanımdan kaldırılmış (deprecated) bir komut. Sadece geriye dönük uyumluluk için duran bir takma ad ve sıradan bir "yeni arayüz yap" isteğinden farklı hiçbir şey yapmaz. Ek kurulum, mülakat, kontrol noktası ya da kalite adımı getirmez. PRODUCT.md yoksa önce `init` akışı çalışır, ardından normal yeni iş (new-work) akışına geçilir.

## Ne zaman kullanılır
- Aslında kullanmana gerek yok. "Bu özelliği yap", "bir landing page hazırla" ya da "bu ekranı yeniden tasarla" gibi doğal bir istek aynı akışı başlatır.
- Eski script'lerde veya alışkanlıkta `craft` geçiyorsa yine çalışır, ama yeni işlerde doğrudan isteğini yaz.

## Örnek
```
/impeccable craft fiyatlandırma sayfası için yıllık/aylık geçişli plan kartları
```

## İlgili komutlar
- `init`: PRODUCT.md yoksa yeni işten önce ürün bağlamını toplar.
- `shape`: Kod yazmadan önce onaylanmış bir tasarım brief'i çıkarır.
