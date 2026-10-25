---
skill: secrets-vault-manager
title: Vault ve bulut sır yönetimi
source: skills/secrets-vault-manager/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Altyapı katmanında sır yönetimini kurar: HashiCorp Vault kümeleri, AWS Secrets Manager, Azure Key Vault ve GCP Secret Manager. Vault için Raft ile HA kurulum, KMS ile otomatik unseal, ortam başına namespace ve çift audit cihazı önerir. AppRole, Kubernetes ve OIDC kimlik doğrulama örnekleri, en az yetki ilkesine göre path bazlı policy tasarımı ve secret engine seçimleri sunar. Sır türüne göre rotasyon sıklığı ve yöntemini (çift hesap, örtüşme penceresi), dinamik veritabanı kimlik bilgilerini ve SSH sertifika otoritesi modelini anlatır. Audit loglarında neyin ne kadar tutulacağını, anomali sinyallerini ve sır sızıntısında 15 dakikada sınırlama adımlarını verir. Vault Agent sidecar, External Secrets Operator ve GitHub Actions OIDC ile CI/CD entegrasyonunu da kapsar. Yerel `.env` hijyeni bu skill'in değil `env-secrets-manager`'ın işidir.

## Ne zaman kullanılır
- Yeni bir Vault kümesi kurarken veya yönetilen bir sır deposuna geçerken
- Veritabanı, API anahtarı ve sertifikalar için otomatik rotasyon kurarken
- SOC 2, ISO 27001 veya HIPAA için sır erişimini denetlerken
- Bir sır sızdığında toplu iptal gerektiğinde

## Örnek
```
Kubernetes servislerimiz için Vault kur, veritabanı şifreleri dinamik olsun ve rotasyon planı çıkar
```

## İlgili skill'ler
- `env-secrets-manager`: Yerel `.env` dosyaları ve sızıntı taraması için.
- `ci-cd-pipeline-builder`: Sırların kullanıldığı pipeline'ı tasarlamak için.
- `kubernetes-operator`: Sırları Kubernetes iş yüklerine bağlarken.
