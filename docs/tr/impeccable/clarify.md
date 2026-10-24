---
command: clarify
title: Arayüz metinlerini netleştirme
source: reference/clarify.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Anlaşılmayan arayüz metinlerini yeniden yazar: buton etiketleri, form alanları, hata mesajları, boş durumlar, yükleme ve başarı mesajları. Hedef, kullanıcının ne olduğunu, neyin önemli olduğunu ve sırada ne yapacağını anlamasıdır. Tek tek metinlere değil tüm etkileşim akışına bakar; anlamı, ürün terminolojisini ve marka sesini korur. Olgusal iddiaları, yasal anlamı veya alana özgü terimleri değiştirmeden önce sorar.

## Ne zaman kullanılır
- Hata mesajları ne olduğunu ve nasıl düzeltileceğini söylemiyorsa.
- Butonlarda `OK`, `Submit` gibi belirsiz etiketler varsa.
- Aynı kavram ürünün farklı yerlerinde farklı kelimelerle anılıyorsa.
- Metinlerin çeviriye, uzun değerlere ve ekran okuyuculara uygun olduğundan emin olmak istiyorsan.

## Örnek
```
/impeccable clarify kayıt formu hataları
```

## İlgili komutlar
- `onboard`: İlk kullanım deneyimi ve yönlendirme akışları için.
- `harden`: Hata durumları ve i18n gibi uç durumları ele alır.
- `polish`: Metinler oturduktan sonra son geçişi yapar.
