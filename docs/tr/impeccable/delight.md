---
command: delight
title: Arayüze kişilik katma
source: reference/delight.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Arayüze hak ettiği anlarda akılda kalan, ürüne özgü dokunuşlar ekler. Önce hedefi, DESIGN.md dosyasını ve ürünün sesini inceleyip fırsat anlarını bulur: emeğin karşılık bulduğu yerler, bekleme anları, ilk kullanım, hata ve kurtarma. Ardından kullanıcının ne hissetmesi gerektiğini tek cümleyle tanımlar ve bunu sağlayacak en küçük çözümü seçer. Amaç jenerik bir eğlence katmanı değil, işe yarayan ve markayı yansıtan bir detaydır.

## Ne zaman kullanılır
- Arayüz düzgün çalışıyor ama ruhsuz hissettiriyorsa
- Micro-interaction, animasyon ya da kişilik eklemek istediğinde
- Başarı, bekleme veya hata ekranlarını daha insani yapmak istediğinde

## Örnek
```
/impeccable delight proje oluşturma sonrası başarı ekranı
```

## İlgili komutlar
- `animate`: Hareket gerektiren dokunuşlar için asıl referans budur.
- `onboard`: İlk kullanım ve boş ekranları yönlendirici hale getirir.
- `polish`: Kişilik oturduğunda son kontrol turunu yapar.
