import { CodegenConfig } from '@graphql-codegen/cli'
import { supabaseAnonKey, supabaseUrl } from './src/constants'

const config: CodegenConfig = {
  // SupabaseのGraphQLエンドポイント
  // `apikey`パラメーターは手前のAPI Gatewayを通るのに必要
  schema: `${supabaseUrl}/graphql/v1?apikey=${supabaseAnonKey}`,

  // 型を生成するクエリーがどこのファイルに記載されているか。
  // 今回は`constants.ts`のみだが、今後の拡張性も考えてとりあえず全てのtsとtsxファイルを探すよう指定
  documents: ['**/*.tsx', '**/*.ts'],

  // 出力したファイルをどこに置くかの指定
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
