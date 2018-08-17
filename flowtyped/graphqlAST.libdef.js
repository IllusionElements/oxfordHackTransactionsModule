// @flow
type TypeDefinition = "OperationDefinition"
  | "ObjectTypeDefinition"
  | "InterfaceTypeDefinition"
  | "InputObjectTypeDefinition"
  | "InputValueDefinition"
  | "EnumTypeDefinition"
  | "DirectiveDefinition"
  | "ScalarTypeDefinition"

type KindType = "Document"
  | "Field"
  | "Argument"
  | "IntValue"
  | "Name"
  | "NamedType"
  | "NonNullType"
  | "SelectionSet"
  | "Variable"

type Kind = KindType | TypeDefinition

type LOC = {
  start: number,
  end: number
}

interface Name {
  kind: "Name",
  value: string,
  loc: LOC
}

interface TypeDef<KIND> {
   kind: KIND,
   name: Name,
   loc: LOC
}

interface FieldDefinition {
  kind: "FieldDefinition",
  name: Name
}

interface AbstractSyntaxTree {
  kind: Kind,
  name: Name,
  interfaces: [TypeDef<"NamedType">],
  directives: [TypeDef<"Directive">],
  fields: [TypeDef<"FieldDefinition">]
}

interface GraphQLAst {
  kind: Kind,
  definitions: [AbstractSyntaxTree]
}

