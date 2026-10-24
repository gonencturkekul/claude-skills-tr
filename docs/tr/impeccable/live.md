---
command: live
title: Canlı varyant modu
source: reference/live.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Tarayıcıda etkileşimli bir tasarım oturumu açar. Sayfada bir öğe seçip bir tasarım aksiyonu (örneğin bolder, quieter, layout) seçersin, ajan HTML+CSS varyantları üretir ve bunlar dev server'ın HMR'ı ile sayfaya anında yerleşir. Varyantlar arasında gezip parametreleri ayarlar, beğendiğini kabul edersin; kabul edilen varyant kalıcı olarak kaynak koda ve stylesheet'e işlenir. Sayfa geneli için steer ile serbest yönlendirme de yapabilirsin.

## Ne zaman kullanılır
- Tasarım alternatiflerini gerçek sayfa üzerinde görerek denemek istediğinde.
- Bir bileşenin birkaç farklı yorumunu yan yana karşılaştırmak istediğinde.
- Yerelde çalışan bir dev server (Vite, Next.js, Bun vb.) ya da tarayıcıda açık statik bir HTML dosyası varken. Production sitelerde çalışmaz.

## Örnek
```
/impeccable live
```

## İlgili komutlar
- `generate`: Öğeyi elle seçmeden, tek cümleyle live oturumu başlatır.
- `init`: Live mode ayarını ilk kurulumda hazırlayabilir.
