# QL Parser

A recursive descent parser for a toy query language. 
A simple interpreter is provided. It will return a predicate function that can be usedto filter collections.

The query language itself is a simplified version of [Infor Nexus's Object Query Language](https://developer.infornexus.com/platform/querying-with-oql), and was derived soley from the documentation available on the [operands](https://developer.infornexus.com/platform/querying-with-oql/operands), [operators](https://developer.infornexus.com/platform/querying-with-oql/operators), and [glossary pages](https://developer.infornexus.com/platform/querying-with-oql/oql-glossary).

This library is not feature complete, or production ready. It was written as an academic exercise to better understand parsers. If it is ever completed, it may be worthwhile to contribute this back upstream to [axus](https://github.com/appxpress/axus).

## Examples

The `./examples/` directory contains several working examples of tokenization, parsing, and interpretation of queries. To run the examples:

```
node examples
```
