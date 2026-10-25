---
skill: atlassian-admin
title: Atlassian sistem yönetimi
source: skills/atlassian-admin/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Jira, Confluence ve diğer Atlassian ürünlerinin kuruluş düzeyindeki yönetimini adım adım yürütür. Kullanıcı ekleme ve çıkarma, grup yapısı, izin şemaları, SAML ile SSO ve SCIM, Marketplace uygulaması değerlendirme, Slack ve GitHub gibi entegrasyonlar, performans bakımı, yedekleme ve olay yönetimi bunlara dahil. Her akışın sonunda değişikliğin gerçekten uygulandığını doğrulayan bir kontrol adımı var. Örneğin ayrılan bir kişinin hesabını kapatmadan önce açık işlerini ve sahibi olduğu sayfaları bulup devretmeni ister. Bu yönetici işlemlerinin hiçbiri Atlassian MCP'de yok. Skill bunları admin.atlassian.com ya da REST API üzerinden yaptırır, MCP'yi yalnızca kullanıcı arama ve envanter çıkarmak için kullanır.

## Ne zaman kullanılır
- Ekibe yeni biri katıldığında ya da biri ayrıldığında erişimleri düzenlemek için
- Okta, Azure AD veya Google ile SSO kurarken
- Bir Marketplace uygulamasını güvenlik açısından değerlendirip kurmadan önce
- Üç ayda bir erişim denetimi ve izin temizliği yaparken

## Örnek
```
Ahmet şirketten ayrılıyor, Jira ve Confluence erişimini kapatmadan önce neleri devretmem gerekiyor?
```

## İlgili skill'ler
- `jira-expert`: Proje bazlı ayarlar ve ayrılan kişinin işlerini yeniden atamak için.
- `confluence-expert`: Grup yapısını belgelemek ve alan izinlerini kurmak için.
- `atlassian-templates`: Kuruluş genelinde yayınlanacak şablonlar için.
