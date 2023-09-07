interface ImageProps {
  path: string;
  index: string;
  gen_seed: number;
  file_id: string;
  file_id_seed: number;
  prompt: string;
  negative_prompt: string;
  guidance_scale: number;
  num_inference_steps: number;
  aspect_ratio: string;
  seed: number;
  batch_size: number;
  model: string;
  revision: string;
  scheduler: string;
  encoded: string;
}

interface ImageMapProps {
  [key: string]: ImageProps;
}

interface ModelProps {
  revision: string;
  model_name: string;
  author: string;
  identifier: string;
  downloaded: boolean;
}

interface ModelMapProps {
  [key: string]: ModelProps;
}

interface ModelAPIProps {
  active: string;
  models: ModelMapProps;
}

export type {
  ImageProps,
  ImageMapProps,
  ModelProps,
  ModelMapProps,
  ModelAPIProps,
};
