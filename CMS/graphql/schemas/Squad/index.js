import Squad from "./Schema/Squad.gql"
import { SquadResolver } from "./Resolvers/Squad.resolver"
import { SchemaLoader } from "../../SchemaLoader"

SchemaLoader.load({
  typeDefs: [Squad],
  resolver: { ...SquadResolver }
})
