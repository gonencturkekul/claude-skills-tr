---
command: typeset
title: Tipografiyi düzenleme
source: reference/typeset.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Font seçimi, hiyerarşi, boyut, ağırlık ve okunabilirliği düzelterek tipografiyi bilinçli hale getirir. Bir tasarım incelemesi ve `detect --scope type` ile mekanik bir tarama yapar, ikisini birleştirdikten sonra düzenler. Satır uzunluğunu 45-75 karakter aralığında tutar, line height'ı fonta göre ayarlar, sadece kullanılan font dosyalarını yükler ve `text-wrap` ile satır kırılımlarını iyileştirir. Mevcut kimliği korur; tamamen yeni bir tipografi kimlik değişikliği demekse DESIGN.md de güncellenir.

## Ne zaman kullanılır
- Fontlar rastgele veya varsayılan seçilmiş gibi duruyorsa
- Başlık, gövde ve etiket rolleri birbirinden ayırt edilemiyorsa
- Uzun metinler okunması yorucu geliyorsa
- Font boyutları tutarsız ve keyfi değerlerden oluşuyorsa

## Örnek
```
/impeccable typeset blog makale sayfası
```

## İlgili komutlar
- `layout`: Boşluk, ritim ve görsel hiyerarşi için.
- `polish`: Hiyerarşi oturduktan sonraki son tur.
- `quieter`: Fazla ağır ve gürültülü tipografiyi yumuşatmak için.
