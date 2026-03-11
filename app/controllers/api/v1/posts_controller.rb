module Api
  module V1
    class PostsController < ApplicationController
      before_action :set_post, only: %i[ show update destroy ]

      # GET /api/v1/posts
      def index
        @posts = Post.all
        render json: @posts
      end

      # GET /api/v1/posts/1
      def show
        render json: @post
      end

      # POST /api/v1/posts
      def create
        @post = Post.new(post_params)

        if @post.save
          render json: @post, status: :created
        else
          render json: @post.errors, status: :unprocessable_content
        end
      end

      # PATCH/PUT /api/v1/posts/1
      def update
        if @post.update(post_params)
          render json: @post
        else
          render json: @post.errors, status: :unprocessable_content
        end
      end

      # DELETE /api/v1/posts/1
      def destroy
        @post.destroy!
      end

      private

      def set_post
        @post = Post.find(params.expect(:id))
      end

      def post_params
        params.expect(post: [ :title, :body ])
      end
    end
  end
end
