---
skill: kubernetes-operator
title: Kubernetes operator geliştirme
source: skills/kubernetes-operator/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Genel bir Kubernetes skill'i değildir; CRD durumunu reconcile eden özel controller'lar, yani operator deseni için yazılmıştır. Temel fikri, operator'ün adım adım çalışan bir betik değil, gerçek durumu istenen duruma idempotent biçimde yaklaştıran bir döngü olduğudur. Sık yapılan hataları hedefler: eksik finalizer, reconcile içinde bloklayan çağrılar, geçici hatalarda yeniden kuyruğa almamak, status yerine spec'i değiştirmek, leader election'ı unutmak. Üç Python aracı vardır: CRD YAML'ını kontrol eden doğrulayıcı, Go reconcile fonksiyonundaki kötü kalıpları yakalayan linter ve operator'ü OperatorHub'ın beş yetenek seviyesine göre puanlayan denetleyici. kubebuilder, operator-sdk, KOPF, metacontroller gibi framework'leri karşılaştırır ve CRD tasarım kurallarını özetler.

## Ne zaman kullanılır
- Yeni bir operator yazmaya başlarken
- Mevcut bir operator'ü yetenek seviyesi açıkları için denetlerken
- Bir Custom Resource'un API yüzeyini tasarlarken
- Framework seçerken ya da RBAC ve leader election'ı sağlamlaştırırken

## Örnek
```
controllers/myapp_controller.go içindeki reconcile fonksiyonunu kötü kalıplar için incele
```

## İlgili skill'ler
- `chaos-engineering`: Operator'ün hata anlarındaki davranışını deneylerle sınamak için.
- `observability-designer`: Yetenek seviyesi 4 için metrik ve alarm kurmak için.
- `runbook-generator`: Operator'ün operasyon kılavuzunu yazmak için.
