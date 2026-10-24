---
command: critique
title: UX odaklı tasarım eleştirisi
source: reference/critique.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Bir sayfayı, özelliği ya da bileşeni UX açısından değerlendirir. Biri tasarım incelemesi, diğeri `impeccable detect` ve tarayıcı üzerinden anti-pattern taraması olmak üzere iki bağımsız değerlendirme çalıştırır; sub-agent varsa bunlar birbirini görmeyen iki ayrı agent'ta yürür. Sonuçta Nielsen'in 10 heuristiğine göre 40 üzerinden puanlanan, öncelikli sorunlar, persona bazlı riskler ve bilişsel yük analizi içeren bir rapor çıkar. Rapor `.impeccable/critique/` altına kaydedilir ve önceki çalıştırmalarla puan trendi gösterilir.

## Ne zaman kullanılır
- Bir tasarım veya bileşen için genel bir geri bildirim istediğinde
- Hangi düzeltmeye önce odaklanacağına karar vermek istediğinde
- Düzeltmelerden sonra puanın gerçekten yükselip yükselmediğini görmek için
- Arayüzün ürüne özgü mü yoksa jenerik mi durduğunu anlamak istediğinde

## Örnek
```
/impeccable critique ödeme sayfası
```

## İlgili komutlar
- `audit`: Erişilebilirlik, performans ve responsive için teknik kontroller yapar.
- `polish`: Critique'in kaydettiği öncelikli sorunları alıp son düzeltme turunu yapar.
- `distill`: Raporda çıkan kalabalık ve bilişsel yük sorunlarını azaltır.
