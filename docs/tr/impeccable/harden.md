---
command: harden
title: Arayüzü production'a hazırlama
source: reference/harden.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Sadece kusursuz veriyle çalışan bir arayüzü gerçek dünyaya dayanıklı hale getirir. Çok uzun ya da boş metinler, emoji ve RTL içerik, binlerce kayıtlık listeler, ağ kopmaları, API hata kodları (400, 401, 403, 404, 429, 500) ve eş zamanlı işlemler gibi uç durumları ele alır. Text overflow, i18n (çeviri genişlemesi, logical CSS property'leri, `Intl` API ile tarih ve sayı formatı), boş ve loading state'leri, form validasyonu, klavye ve ekran okuyucu desteği ile yarıda kesilen drag hareketleri gibi konuları düzeltir.

## Ne zaman kullanılır
- Bir ekranı canlıya almadan önce
- Uzun metinler layout'u taşırıyor veya kırıyorsa
- Hata, boş veya yükleniyor durumları eksikse
- Uygulama farklı dillere çevrilecekse

## Örnek
```
/impeccable harden kullanıcı profil formu
```

## İlgili komutlar
- `audit`: Erişilebilirlik ve performans için teknik denetim yapar.
- `onboard`: Boş ekranları kullanıcıyı yönlendiren alanlara çevirir.
- `polish`: Uç durumlar kapandıktan sonra son turu yapar.
