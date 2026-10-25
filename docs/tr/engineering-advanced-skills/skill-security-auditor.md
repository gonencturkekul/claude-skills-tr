---
skill: skill-security-auditor
title: Skill güvenlik denetimi
source: skills/skill-security-auditor/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Bir AI ajan skill'ini kurmadan önce güvenlik açısından tarar ve GEÇTİ, UYARI veya KALDI şeklinde net bir karar verir. Yerel bir klasörü ya da git deposu adresini `scripts/skill_security_auditor.py` ile inceler. Script dosyalarında komut enjeksiyonu, `eval` ve `exec`, gizlenmiş kod, dışarı veri gönderen ağ çağrıları, `~/.ssh` veya `~/.aws` gibi yerlerden kimlik bilgisi okuma, yetki yükseltme ve güvensiz deserialization arar. SKILL.md ve referans dosyalarında prompt injection kalıplarını, gizli talimatları ve aşırı yetki isteyen ifadeleri yakalar. Bağımlılıklarda typosquatting, sabitlenmemiş sürüm ve script içinden paket kurulumunu, dosya yapısında ise skill klasörü dışına çıkan yolları, gizli dosyaları, ikili dosyaları ve dışarı işaret eden symlink'leri işaretler. Her bulgu için düzeltme önerisi verir. Kodu çalıştırmaz, yalnızca statik analiz yapar; bu yüzden zamanlanmış veya çok yaratıcı gizlenmiş saldırıları kaçırabilir.

## Ne zaman kullanılır
- Güvenmediğin bir kaynaktan skill veya plugin kurmadan önce
- CI'da yeni eklenen skill'ler için otomatik bir güvenlik kapısı istediğinde
- Bir klasördeki tüm skill'leri toplu denetlemek için

## Örnek
```
Bu GitHub deposundaki skill'i kurmadan önce güvenli mi diye tara
```

## İlgili skill'ler
- `skill-tester`: Güvenlik yerine yapı ve kalite puanı için.
- `dependency-auditor`: Skill'in bağımlılıklarını daha derin incelemek için.
- `pr-review-expert`: Skill değişikliklerini PR üzerinden incelemek için.
