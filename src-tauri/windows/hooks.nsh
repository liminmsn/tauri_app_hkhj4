!macro NSIS_HOOK_POSTINSTALL
  ; ================================
  ; 删除开始菜单快捷方式（当前用户）
  ; ================================

  SetShellVarContext current

  ; 1. 删除 Programs 根目录下的快捷方式
  Delete "$SMPROGRAMS\${PRODUCTNAME}.lnk"

  ; 2. 保险：如果存在带文件夹的情况，一并清理
  ${If} "$AppStartMenuFolder" != ""
    Delete "$SMPROGRAMS\$AppStartMenuFolder\${PRODUCTNAME}.lnk"
    RMDir "$SMPROGRAMS\$AppStartMenuFolder"
  ${EndIf}

  ; 3. 保险：删除安装目录下误生成的快捷方式（你之前遇到过）
  Delete "$INSTDIR\${PRODUCTNAME}.lnk"
!macroend
