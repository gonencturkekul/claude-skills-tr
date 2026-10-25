---
skill: sql-database-assistant
title: SQL sorgu ve migration yardımcısı
source: skills/sql-database-assistant/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Veritabanıyla gündelik işleri üstlenir: sorgu yazmak, performansı iyileştirmek, migration üretmek ve uygulama kodu ile veritabanı arasındaki boşluğu kapatmak. Doğal dildeki bir isteği varlık, ilişki, filtre ve toplama adımlarıyla SQL'e çevirir; top-N, kümülatif toplam ve upsert gibi hazır kalıpları vardır. PostgreSQL, MySQL, SQLite ve SQL Server şemalarını sorgulayıp dokümante eder. EXPLAIN çıktısını okuyarak indeks önerir, `SELECT *`, sargable olmayan filtreler ve N+1 gibi sorunları düzeltir; `query_optimizer.py` sorguları statik olarak analiz eder. `migration_generator.py` ile up ve down script'leri üretir, sütun ekleme ve yeniden adlandırma gibi işlemler için kesintisiz migration sıralamaları ve geri alma stratejileri verir. Prisma, Drizzle, TypeORM ve SQLAlchemy kalıplarını, kısıtlar, izolasyon seviyeleri, deadlock önleme ve yedekleme pratiklerini de kapsar.

## Ne zaman kullanılır
- Karmaşık bir SQL sorgusu yazman gerektiğinde
- Yavaş bir sorguyu hızlandırmak veya indeks seçmek istediğinde
- Canlı tabloda kesinti olmadan şema değiştirmen gerektiğinde
- Bir ORM ile çalışırken doğru kalıbı bulmak için

## Örnek
```
Bu PostgreSQL sorgusu çok yavaş, EXPLAIN çıktısına bakıp hangi indeksi eklemem gerektiğini söyle
```

## İlgili skill'ler
- `database-designer`: Şema mimarisi ve normalizasyon için.
- `database-schema-designer`: ERD ve ilişki modellemesi için.
- `migration-architect`: Çok adımlı karmaşık migration'ları yönetmek için.
