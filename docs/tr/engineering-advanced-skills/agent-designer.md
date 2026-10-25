---
skill: agent-designer
title: Çok ajanlı sistem tasarımı
source: skills/agent-designer/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Birden fazla ajanın birlikte çalıştığı sistemleri tasarlar, ajanlara verilecek araç şemalarını üretir ve çalışma loglarını değerlendirir. İşi üç Python script'i yürütür: mimariyi gözle seçmek yerine planlayıcı script gereksinimlerine göre bir desen puanlar. Seçenekler tek ajan, supervisor, pipeline, hiyerarşik yapı ve swarm; her birinin ne zaman uygun olduğu ve nerede tıkandığı bir tabloda anlatılır. Planlayıcı rolleri, iletişim bağlantılarını, bir Mermaid diyagramını ve uygulama yol haritasını çıkarır. Araç tanımlarından hem Anthropic hem OpenAI formatında şema üretilir ve her şemanın doğrulamadan geçmesi şarttır. Sistem çalışınca loglardan başarı oranı, gecikme, maliyet ve darboğaz raporu alınır. Pilot çalıştırmada kritik sorun sıfıra inmeden tasarım bitmiş sayılmaz.

## Ne zaman kullanılır
- Gereksinimlerden yola çıkıp yeni bir çok ajanlı sistem kurarken
- Düz metin araç tanımlarından sağlayıcıya hazır şemalar istediğinde
- Çalışan bir ajan sisteminin loglarında maliyet ve gecikme sorunlarını ararken
- Tek ajanlı iş akışları için değil: onlar için `agent-workflow-designer` var

## Örnek
```
Araştırma otomasyonu için bir ajan mimarisi tasarla, kaç ajan gerektiğine sen karar ver
```

## İlgili skill'ler
- `agent-workflow-designer`: Tek ajan ya da daha basit adım adım akışlar için.
- `agent-regression-evals`: Tasarladığın ajanda yapılan değişikliklerin işi bozmadığını kanıtlamak için.
- `rag-architect`: Ajanların arama yaptığı bir bilgi tabanı kuruyorsan.
