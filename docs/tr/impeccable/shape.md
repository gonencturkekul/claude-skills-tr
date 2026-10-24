---
command: shape
title: Kod öncesi tasarım planı
source: reference/shape.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Kod yazmadan önce UX ve UI'ı planlar. Zorunlu bir keşif görüşmesiyle başlar: her turda 2-3 soru sorar ve cevapları bekler. Önce amaç, kullanıcı ve beklenen sonucu, gerekirse içerik, state'ler, kapsam ve kısıtları netleştirir. Sonunda kullanıcının onayladığı kısa bir tasarım brief'i üretir ve durur; kod veya implementasyon yazmaz.

## Ne zaman kullanılır
- Yeni bir özellik veya ekran üzerinde çalışmaya başlamadan önce
- İstek belirsizse ve neyin yapılacağı net değilse
- Birden fazla ekranı kapsayan bir akışı planlarken
- Geliştiriciye veya başka bir komuta verilecek net bir brief gerektiğinde

## Örnek
```
/impeccable shape kullanıcı onboarding akışı
```

## İlgili komutlar
- `critique`: Var olan bir arayüzü değerlendirmek için.
- `onboard`: Onboarding deneyimine odaklanmak için.
- `init`: Projenin tasarım bağlamını kurmak için.
