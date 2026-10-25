---
skill: database-schema-designer
title: Gereksinimlerden ilişkisel şema
source: skills/database-schema-designer/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Düz metin gereksinimlerden ilişkisel bir veritabanı şeması tasarlar ve etrafındaki her şeyi üretir. Önce varlıkları çıkarır, sonra aralarındaki bire çok ve çoka çok ilişkileri belirler, ardından çok kiracılık için organizasyon kimliği, silmek yerine işaretleme (soft delete), denetim alanları ve iyimser kilitleme için sürüm sütunu gibi ortak ihtiyaçları ekler. Drizzle, Prisma, TypeORM ve Alembic için migration, TypeScript ya da Python tipleri, gerçekçi seed verisi ve Mermaid ERD üretebilir. Çok kiracılı uygulamalar için PostgreSQL Row-Level Security politikası örnekleri içerir. Sık hataları da listeler: soft delete sütununa index koymamak, e-posta gibi değişebilen bir alanı birincil anahtar yapmak, RLS'yi yetkisiz bir rolle test etmemek. Her yabancı anahtara index ve UUID ya da CUID anahtarlar önerir.

## Ne zaman kullanılır
- Yeni bir özellik için tablolar tasarlarken
- Mevcut bir şemaya çok kiracılık eklerken
- Prisma şemasından TypeScript tipleri ya da ERD üretmek istediğinde
- Kırıcı bir şema değişikliği için migration planlarken

## Örnek
```
Kullanıcılar proje açabilsin, projelerde görevler ve etiketler olsun, tam denetim kaydı tutulsun: bunun için Prisma şeması ve ERD çıkar
```

## İlgili skill'ler
- `database-designer`: Var olan şemayı script'lerle analiz edip index önerisi almak için.
- `sql-database-assistant`: Şema hazır olduktan sonra sorgu yazmak için.
- `migration-architect`: Geniş kapsamlı, geri alma planı gerektiren geçişler için.
