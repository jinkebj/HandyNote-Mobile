import Quill from 'quill'
import {ContainBlot, TableRow, Table, TableCell, RowBreak, CellBreak} from '@/quill_modules/TableFormat'

class TableHandler {
  static register () {
    Quill.register(ContainBlot)
    Quill.register(TableRow)
    Quill.register(Table)
    Quill.register(TableCell)
    Quill.register(RowBreak)
    Quill.register(CellBreak)
  }

  constructor (quill, options = {}) {
    // save the quill reference and options
    this.quill = quill
    this.options = options
  }
}

export default TableHandler
