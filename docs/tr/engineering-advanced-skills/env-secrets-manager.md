---
skill: env-secrets-manager
title: Ortam değişkeni ve secret hijyeni
source: skills/env-secrets-manager/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
`.env` dosyalarının ve secret'ların yerelde ve production'da güvenli tutulmasına odaklanır. `env_auditor.py` betiği depoyu tarar, olası sızmış kimlik bilgilerini önem derecesine göre listeler, istersen CI için JSON çıktı verir. Önerdiği akış şöyle: önce critical ve high bulgular, sonra gerçek anahtarları rotate etmek, `.env.example` ve `.gitignore` dosyalarını düzeltmek, en son pre-commit ve CI taramalarını sıkılaştırmak. Production için Vault, AWS, Azure ve GCP secret store'larını karşılaştırır, rotasyonu tespit, yenileme ve otomasyon adımlarına böler. Sızıntı kesinleştiğinde izlenecek acil durum listesi, GitHub Actions ve GitLab CI'da secret kullanımı, gitleaks ve detect-secrets kurulumu ile erişim loglarına dayalı alarm önerileri de içerir.

## Ne zaman kullanılır
- Env veya config dosyalarına dokunan bir commit'i push etmeden önce
- Güvenlik denetimi ya da bir sızıntı şüphesi sırasında
- Production'da eksik ortam değişkeni yüzünden çıkan bir hatayı incelerken
- Yeni bir projeyi baştan secret sızıntısına karşı korumak istediğinde

## Örnek
```
Bu depoda yanlışlıkla commit edilmiş API anahtarı var mı, tara ve rotasyon planı çıkar
```

## İlgili skill'ler
- `secrets-vault-manager`: Production'da Vault altyapısı, yüksek erişilebilirlik ve felaket kurtarma için.
- `ci-cd-pipeline-builder`: Pipeline içinde secret enjeksiyonunu kurmak için.
- `dependency-auditor`: Güvenlik taramasını bağımlılıklara genişletmek için.
