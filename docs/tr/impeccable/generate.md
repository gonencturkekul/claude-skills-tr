---
command: generate
title: Hızlı varyant üretimi
source: reference/generate.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Live mode'a giden kısa yol. Tek cümlede öğeyi, yönü ve adedi söylersin; ajan live oturumunu başlatır, sayfada öğeyi bulur, tarayıcıyı ona kaydırır ve istenen yönde varyantları üretir. Sen de tarayıcıdaki çubukla varyantlar arasında gezip birini kabul edersin. Sayı verilmezse 3 varyant üretilir, en fazla 8. Yön belirtilmezse (örneğin sadece "daha iyi") hangi yönde gideceğini sorar. Sadece web projelerinde çalışır.

## Ne zaman kullanılır
- Belirli bir öğe ve net bir yön aklındaysa, elle öğe seçmekle uğraşmadan.
- "Fiyat kartlarının 3 daha cesur versiyonu" gibi hızlı karşılaştırmalar için.
- Zaten çalışan bir dev server ve açık bir sekme varken.

## Örnek
```
/impeccable generate fiyat kartlarının 3 daha cesur versiyonu
```

## İlgili komutlar
- `live`: Öğeleri tarayıcıda kendin seçtiğin etkileşimli mod.
- `bolder` / `quieter`: Native projelerde generate yerine kaynak üzerinde çalışır.
