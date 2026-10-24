---
topic: motion
title: Hareket ve animasyon
source: references/motion.md
upstreamCommit: 6010f91a9935f1c167dfc500fb1a475681892e6b
---
## Ne anlatır
Sayfaya animasyon eklemeden önce okunacak rehber. Hareket son adımdır: statik sayfa bitmiş ve `inspect.mjs` kontrolünü geçmiş olmalı, hareket zayıf bir düzeni kurtarmak için kullanılmaz. Bir hareket bütçesi tanımlar: iki üç scroll sahnesi, tek bir imza anı, bölüm bölüm sıralanmış girişler, tıklama ve hover geri bildirimi, bir de hareketli görsel. Easing ve süre token'larını, Awwwards sitelerinden ölçülmüş süre ve stagger değerlerini verir. Maskeli başlık, image shutter, opening window, ink fill, sayfa geçişi gibi kopyalayıp uyarlayabileceğin tarifler içerir. Preloader, özel imleç, scroll hijacking, bounce easing ve her bloğa aynı fade-up uygulamak yasak. Her tarifte reduced motion durumu, sayfanın bitmiş halidir.

## Ne zaman işine yarar
- Bitmiş bir sayfaya animasyon eklemek istediğinde
- Hangi easing eğrisini ve süreyi seçeceğine karar veremediğinde
- Sayfadaki hareket tekdüze ve "yapay zeka yapmış" gibi duruyorsa
- `prefers-reduced-motion` ve performans kurallarını doğru kurmak için

## Örnek
```
Mimarlık ofisimin sitesi bitti, şimdi scroll ile gelen animasyonlar ekle ama abartma
```

## İlgili konular
- `scenes`: Büyük scroll sahnelerinin nasıl doldurulup kurulduğunu anlatır.
- `layout`: Hareketten önce kompozisyonun oturmuş olması gerekir.
- `critique`: Hareket eklendikten sonra ekran görüntülerinde boş kalan alanları yakalamak için.
