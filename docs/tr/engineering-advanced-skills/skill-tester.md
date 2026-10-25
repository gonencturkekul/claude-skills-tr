---
skill: skill-tester
title: Skill doğrulama ve puanlama
source: skills/skill-tester/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
claude-skills deposundaki skill'leri doğrulayan, test eden ve puanlayan bir meta skill. Depo kökünden çalışan dört araçla gelir. `skill_validator.py` frontmatter'ı, zorunlu bölümleri, klasör yapısını ve script'lerin yalnızca standart kütüphane kullanıp kullanmadığını kontrol eder. `script_tester.py` Python script'lerinin sözdizimini ve import'larını inceler, onları zaman aşımı korumasıyla çalıştırır ve örnek çıktılarla karşılaştırır. `quality_scorer.py` dokümantasyon, kod kalitesi, bütünlük ve kullanılabilirlik eksenlerinde 0 ile 100 arası puan, harf notu ve BASIC, STANDARD veya POWERFUL kademe önerisi verir, bir de iyileştirme yol haritası çıkarır. `security_scorer.py` güvenlik duruşunu ölçer. Bir skill ancak üç adım aynı turda başarılı olursa geçmiş sayılır; değilse yol haritasının ilk maddesi uygulanıp hepsi yeniden çalıştırılır. Kademe satır sayıları eski skill'ler içindir, yeni skill'leri bu sınırlara ulaşsın diye şişirmemek gerekir.

## Ne zaman kullanılır
- Yeni bir skill yazarken kalitesini ölçmek istediğinde
- Mevcut skill'leri kademe yükseltmesi için denetlerken
- Skill kalitesi için pre-commit hook veya CI kapısı kurarken

## Örnek
```
self-eval skill'ini doğrula, script'lerini test et ve en az 75 puan alıyor mu bak
```

## İlgili skill'ler
- `skill-security-auditor`: Kalite yerine güvenlik riskleri için.
- `self-eval`: Skill yerine yapılan işi puanlamak için.
- `ci-cd-pipeline-builder`: Bu kontrolleri bir pipeline'a bağlamak için.
