---
skill: atlassian-templates
title: Jira ve Confluence şablonları
source: skills/atlassian-templates/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Jira ve Confluence için tekrar tekrar kullanılacak şablonları tasarlar, günceller ve yayınlar. Toplantı notu, proje şartı (charter), sprint retrosu, PRD ve karar kaydı gibi Confluence şablonlarıyla user story, bug raporu ve epic gibi Jira şablonlarını kapsar. Şablon oluşturma, sürümleyerek değiştirme ve çok sayfalı blueprint geliştirme için ayrı akışları var. Paketteki bir Python script'i, Confluence'ın kabul ettiği storage formatında (XHTML) sayfa gövdesi üretiyor. Bu gövde MCP ile sayfa olarak yayınlanıyor, ardından sayfanın makro hatası olmadan açıldığı kontrol ediliyor. Gerçek alan şablonu kaydetmek, etiket eklemek ve Jira açıklama alanına varsayılan metin koymak MCP'de olmadığı için skill bunları arayüzden yapmanı söyler. Eski şablonlar silinmez, uyarı bandıyla arşivlenir.

## Ne zaman kullanılır
- Ekipler aynı belgeyi her seferinde farklı biçimde yazıyorsa
- Kuruluş genelinde standart bir toplantı notu ya da retro şablonu istediğinde
- Var olan bir şablonu, eski içerikleri bozmadan güncellemek için
- Bir şablonu birden fazla Confluence alanına yaymak gerektiğinde

## Örnek
```
/pm-skills:atlassian-templates ekip için karar kaydı şablonu hazırla ve ENG alanına yayınla
```

## İlgili skill'ler
- `confluence-expert`: Şablonların yaşayacağı alan yapısı ve makrolar için.
- `atlassian-admin`: Kuruluş genelinde dağıtım ve onay için.
- `scrum-master`: Sprint törenlerine özel şablon ihtiyaçları için.
