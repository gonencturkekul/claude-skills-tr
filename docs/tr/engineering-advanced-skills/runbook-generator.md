---
skill: runbook-generator
title: Operasyon runbook'u üretimi
source: skills/runbook-generator/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Bir servis adından operasyon runbook'u iskeleti üretir. `scripts/runbook_generator.py` çıktıyı ekrana basar ya da sahip ekip bilgisiyle bir markdown dosyasına yazar. İskelette başlatma, durdurma, sağlık kontrolü ve geri alma için standart bölümler, eskalasyon ve olay yönetimi için doldurulacak alanlar bulunur. Deployment ve olay müdahalesi için hazır şablonlar da referans olarak gelir. Önerilen akış şöyle: iskeleti üret, servise özel komut ve adresleri doldur, doğrulama adımları ve geri alma tetikleyicileri ekle, staging'de prova et, runbook'u servis koduyla birlikte sürüm kontrolünde tut. Her komutun kopyalayıp yapıştırılabilir olmasını, kritik adımlardan sonra sağlık kontrolü yapılmasını ve runbook'un olaylardan sonra güncellenmesini önerir.

## Ne zaman kullanılır
- Bir servisin hiç runbook'u yoksa ve hemen bir temel gerekiyorsa
- Ekipler arasında runbook'lar tutarsız olduğunda
- On-call'a yeni katılanlar için standart operasyon dokümanı hazırlarken
- Yeni bir servisi üretime almadan önce

## Örnek
```
payments-api servisi için platform ekibine ait bir runbook çıkar, geri alma adımlarını da ekle
```

## İlgili skill'ler
- `slo-architect`: Runbook'taki alarm ve eskalasyon eşiklerini SLO'lara bağlamak için.
- `observability-designer`: Sağlık kontrollerinin dayanacağı metrikleri tasarlamak için.
- `chaos-engineering`: Runbook'u gerçek bir olaydan önce denemek için.
