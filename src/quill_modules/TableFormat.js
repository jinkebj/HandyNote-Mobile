import Quill from 'quill'

let Container = Quill.import('blots/container')
let Block = Quill.import('blots/block')
let Parchment = Quill.import('parchment')
let BlockEmbed = Quill.import('blots/block/embed')

class ContainBlot extends Container {
  static create (value) {
    let tagName = 'contain'
    let node = super.create(tagName)
    return node
  }

  insertBefore (blot, ref) {
    if (blot.statics.blotName === this.statics.blotName) {
      super.insertBefore(blot.children.head, ref)
    } else {
      super.insertBefore(blot, ref)
    }
  }

  static formats (domNode) {
    return domNode.tagName
  }

  formats () {
    // don't inherit from FormatBlot
    return { [this.statics.blotName]: this.statics.formats(this.domNode) }
  }

  replace (target) {
    if (target.statics.blotName !== this.statics.blotName) {
      let item = Parchment.create(this.statics.defaultChild)
      target.moveChildren(item)
      this.appendChild(item)
    }
    if (target.parent == null) return
    super.replace(target)
  }
}

ContainBlot.blotName = 'contain'
ContainBlot.tagName = 'contain'
ContainBlot.scope = Parchment.Scope.BLOCK_BLOT
ContainBlot.defaultChild = 'block'
ContainBlot.allowedChildren = [Block, BlockEmbed, Container]

class TableRow extends Container {
  static create (value) {
    let tagName = 'tr'
    let node = super.create(tagName)
    return node
  }

  optimize () {
    super.optimize()
    var parent = this.parent
    if (parent != null && parent.statics.blotName !== 'table') {
      this.processTable()
    }
  }

  processTable () {
    var currentBlot = this
    var rows = []
    while (currentBlot) {
      if (!(currentBlot instanceof TableRow)) {
        break
      }
      rows.push(currentBlot)
      currentBlot = currentBlot.next
    }
    let mark = Parchment.create('block')
    this.parent.insertBefore(mark, this.next)
    let table = Parchment.create('table')
    rows.forEach(function (row) {
      table.appendChild(row)
    })
    table.replace(mark)
  }
}

TableRow.blotName = 'tr'
TableRow.tagName = 'tr'
TableRow.scope = Parchment.Scope.BLOCK_BLOT
TableRow.defaultChild = 'td'

class Table extends Container {
  optimize () {
    super.optimize()
    let next = this.next
    if (next != null && next.prev === this &&
        next.statics.blotName === this.statics.blotName &&
        next.domNode.tagName === this.domNode.tagName
        ) {
      next.moveChildren(this)
      next.remove()
    }
  }
}

Table.blotName = 'table'
Table.tagName = 'table'
Table.scope = Parchment.Scope.BLOCK_BLOT
Table.defaultChild = 'tr'
Table.allowedChildren = [TableRow]

class TableCell extends ContainBlot {

  format () {
    return 'td'
  }

  optimize () {
    super.optimize()
    let parent = this.parent
    if (parent !== null && parent.statics.blotName !== 'tr') {
      this.processTR()
    }
    // merge same TD id
    let next = this.next
    if (next != null && next.prev === this &&
        next.statics.blotName === this.statics.blotName &&
        next.domNode.tagName === this.domNode.tagName
        ) {
      next.moveChildren(this)
      next.remove()
    }
  }
  processTR () {
    // find next row break
    var currentBlot = this
    var rowItems = [this]
    while (currentBlot) {
      if (currentBlot.statics.tagName !== 'TD') {
        break
      }
      rowItems.push(currentBlot)
      if (currentBlot instanceof RowBreak) {
        break
      }
      currentBlot = currentBlot.next
    }
    // create row, add row items as TDs
    var cellItems = []
    var cells = []
    rowItems.forEach(function (rowItem) {
      cellItems.push(rowItem)
      if (rowItem instanceof CellBreak) {
        cells.push(cellItems)
        cellItems = []
      }
    })

    if (cellItems.length > 0) {
      cells.push(cellItems)
    }
    let mark = Parchment.create('block')
    this.parent.insertBefore(mark, this.next)
    // create row
    var row = Parchment.create('tr')
    cells.forEach(function (cell) {
    // add row elements
      cell.forEach(function (cellItem) {
        if (cellItem instanceof TableCell) {
          cellItem.domNode.classList.add('ql-td-' + cells.length)
        }
        row.appendChild(cellItem)
      })
    })
    row.replace(mark)
  }
}

TableCell.blotName = 'td'
TableCell.tagName = 'td'
TableCell.scope = Parchment.Scope.BLOCK_BLOT
TableCell.defaultChild = 'block'
TableCell.allowedChildren = [Block, BlockEmbed, Container]

Quill.imports['tablecell'] = TableCell

Container.order = [
  'list', 'contain',   // Must be lower
  'td', 'tr', 'table'  // Must be higher
]

class RowBreak extends BlockEmbed {
  formats () {
    return { trbr: true }
  }
}
RowBreak.blotName = 'trbr'
RowBreak.tagName = 'td'
RowBreak.className = 'trbr'

class CellBreak extends BlockEmbed {
  formats () {
    return { tdbr: true }
  }
}
CellBreak.blotName = 'tdbr'
CellBreak.tagName = 'td'
CellBreak.className = 'tdbr'

export { ContainBlot, TableRow, Table, TableCell, RowBreak, CellBreak }
