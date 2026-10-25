---
skill: performance-profiler
title: Performans profilleme
source: skills/performance-profiler/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Node.js, Python ve Go uygulamalarında CPU, bellek ve I/O darboğazlarını sistemli şekilde bulur. Altın kuralı önce ölçmektir: herhangi bir optimizasyondan önce P50, P95, P99 gecikme, saniyedeki istek, hata oranı ve bellek kullanımı kaydedilir, düzeltmeden sonra aynı ölçüm tekrarlanır. Tahmine dayalı düzeltme yapılmaz. Flamegraph, py-spy ve pprof ile CPU profili, heap snapshot ile bellek sızıntısı tespiti, bundle boyutu analizi, EXPLAIN ANALYZE ve N+1 sorgu tespiti ile veritabanı optimizasyonu, k6 ve Artillery ile yük testi kapsamındadır. `performance_profiler.py` betiği bir projeyi performans risk işaretleri için tarar, CI için JSON da verir. Ayrıntılı komutlar ve hızlı kazanım listesi referans dosyalarındadır.

## Ne zaman kullanılır
- Uygulama yavaş ama darboğazın nerede olduğunu bilmiyorsan
- Bellek kullanımı zamanla artıyor ve sızıntıdan şüpheleniyorsan
- Yeni bağımlılıklardan sonra bundle boyutu büyüdüyse
- Bir lansman ya da trafik artışı öncesi yük testi yapmak istediğinde

## Örnek
```
/orders endpoint'i P99'da 2 saniyeyi geçiyor, önce baseline ölç sonra darboğazı bul
```

## İlgili skill'ler
- `observability-designer`: Gecikmeyi sürekli izleyecek dashboard ve alarmlar için.
- `sql-database-assistant`: Yavaş sorguları optimize etmek için.
- `slo-architect`: Gecikme hedeflerini SLO olarak tanımlamak için.
