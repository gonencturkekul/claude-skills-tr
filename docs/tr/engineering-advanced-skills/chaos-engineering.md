---
skill: chaos-engineering
title: Kaos mühendisliği deneyleri
source: skills/chaos-engineering/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Sisteme bilerek hata enjekte ettiğin deneyleri, bir kesintiye dönüşmeden planlamana ve yürütmene yardım eder. Temel kuralı şu: iptal kriteri olmayan bir kaos deneyi, başka adla bir kesintidir. Her deneyde bir hipotez, önceden ölçülmüş bir kararlı durum metriği, sınırlanmış bir etki alanı, somut iptal kriterleri ve geri alma adımı ister. Üç Python script'i var: biri bu bölümleri zorunlu tutan bir deney planı yazar, biri etkilenecek kullanıcı sayısını ve harcanacak hata bütçesini hesaplayıp yeşil, sarı ya da kırmızı bir risk notu verir, biri de deneyden sonra suçlama içermeyen bir postmortem çıkarır. Gecikme, hata, kaynak, ağ bölünmesi, bağımlılık, zaman ve altyapı olmak üzere yedi saldırı türünü ve Chaos Mesh, Litmus, Gremlin, AWS FIS gibi araçların karşılaştırmasını içerir.

## Ne zaman kullanılır
- Bir kaos deneyi ya da Game Day planlarken
- Deneyi çalıştırmadan önce etki alanını hesaplamak için
- Mevcut bir deney planını güvenlik açısından incelerken
- Hangi kaos aracını seçeceğine karar verirken
- Deney sonrası postmortem yazarken

## Örnek
```
payment-svc yavaşladığında checkout'un p99 gecikmesi 500ms altında kalır mı, bunu test eden bir deney planla
```

## İlgili skill'ler
- `feature-flags-architect`: Orada tanımlanan kill switch'ler buradaki deneylerin iptal tetikleyicisi olur.
- `kubernetes-operator`: Operator'lar sık seçilen kaos hedefleridir.
- `slo-architect`: Deneyin harcayacağı hata bütçesini belirlemek için.
