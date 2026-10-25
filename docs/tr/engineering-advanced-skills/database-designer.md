---
skill: database-designer
title: Veritabanı tasarımı ve optimizasyonu
source: skills/database-designer/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Veritabanı şemalarını analiz eder, index'leri iyileştirir ve migration üretir. İşi üç script ile yapar, şemayı elle incelemez. İlki SQL DDL ya da JSON şemayı okuyup normalizasyon sorunlarını, eksik kısıtları, isimlendirme hatalarını bulur ve bir Mermaid ERD çizer. İkincisi senin sık çalışan sorgularına bakarak öncelik sıralı CREATE INDEX önerileri ve gereksiz index'lerin listesini verir. Üçüncüsü mevcut ve hedef şema arasında migration yazar, istersen kesintisiz geçiş için önce genişletip sonra daraltan bir plan çıkarır. Bunun yanında JOIN, CTE ve window function örnekleri, EXPLAIN çıktısını okuma, N+1 sorgu tespiti, bağlantı havuzu, PostgreSQL, MySQL, SQLite ve SQL Server karşılaştırması, NoSQL'in ne zaman mantıklı olduğu, sharding ve replikasyon desenleri gibi başvuru bilgileri içerir. Varsayılan önerisi SQL.

## Ne zaman kullanılır
- Yeni bir şema tasarlarken ya da mevcut birini incelerken
- Yavaş sorgular için hangi index'lerin gerektiğini bulmak istediğinde
- Kesintisiz bir şema migration'ı planlarken
- SQL mi NoSQL mi, hangi veritabanı motoru kararını verirken

## Örnek
```
schema.sql dosyamı analiz et, eksik index ve kısıtları bul, ERD'sini çiz
```

## İlgili skill'ler
- `database-schema-designer`: Gereksinimlerden şema, tip ve RLS politikası üretmek için.
- `sql-database-assistant`: Günlük sorgu yazma ve ORM işleri için.
- `migration-architect`: Motorlar arası ya da büyük ölçekli geçişleri planlamak için.
