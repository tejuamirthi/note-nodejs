const PROTO_PATH = './notes.proto';
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
      keepCase: true,
      longs: String, // JavaScript doesn't support long ints
      enums: String, // JavaScript doesn't support enum types
      defaults: true,
      oneofs: true
    }
)

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
// grab the authService package from the protobuf file
const NoteService = protoDescriptor.NoteService
const client = new NoteService('localhost:50051',
    grpc.credentials.createInsecure());

module.exports.client = client
module.exports.protoDescriptor = protoDescriptor