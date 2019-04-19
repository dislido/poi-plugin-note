interface NoteItem {
  title: string; // 笔记标题，为空时用text的第一行代替
  text: string; // 笔记内容
  updateTime: number; // 修改日期
}
