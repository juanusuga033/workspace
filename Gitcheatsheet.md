# Git Cheat Sheet

## Hacer un Commit

Para hacer un commit en Git, sigue estos pasos:

```bash
# 1. Ver cambios (opcional)
git status

# 2. Agregar cambios a staging
git add .              # Agregar todos los cambios
# O agregar archivos específicos:
git add archivo.txt

# 3. Hacer commit con mensaje
git commit -m "Descripción de los cambios"
```

### Ejemplo completo:
```bash
git add .
git commit -m "Agregar nuevas funciones"
```

### Opciones útiles:
```bash
# Commit amend (modificar el último commit)
git commit --amend -m "Nuevo mensaje"

# Commit sin staging (solo para archivos seguidos)
git commit -am "Descripción"

# Ver el historial de commits
git log
```
